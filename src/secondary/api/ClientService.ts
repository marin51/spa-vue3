import { FirebaseService } from '@/utils/FirebaseService';
import {
    collection,
    addDoc,
    query,
    getDocs,
    WithFieldValue,
    getFirestore,
    where,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

export type PostResponse = {
    docId: string;
};

export class ClientService {
    private static readonly app = FirebaseService.getInstance();
    private static readonly db = getFirestore(this.app);
    private static readonly userId = this.getUserId();

    private static getUserId() {
        // TODO: Improve this
        const localUserData = localStorage.getItem('user');
        let userId = '';

        if (localUserData) {
            userId = JSON.parse(localUserData).id;
            return userId;
        }
        console.error('Not such a user');
        throw Error('Not such a user');
    }

    // Static method to remove undefined properties from data
    private static removeUndefinedProperties<T extends object>(data: T): T {
        // Create a mutable copy of the data object
        const mutableData: any = Array.isArray(data) ? [] : {};

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                if (typeof value === 'object' && value !== null) {
                    // Recursively clean nested objects
                    mutableData[key] = this.removeUndefinedProperties(value as any);
                } else {
                    mutableData[key] = value;
                }
            }
        }

        return mutableData as T;
    }

    public static async get<ResponseType>(url: string): Promise<ResponseType[]> {
        try {
            const q = query(collection(this.db, url), where('uid', '==', this.userId));
            const querySnapshot = await getDocs(q);
            const dataList: ResponseType[] = [];

            // Iterate through each document in the collection and add it to dataList
            querySnapshot.forEach((doc) => {
                const docData = doc.data() as ResponseType;
                dataList.push(docData);
            });
            console.log(dataList);
            return dataList; // Return the list of document data
        } catch (error) {
            console.error('Error fetching data from Firestore:', error);
            throw new Error('Failed to fetch data');
        }
    }

    public static async post<DocumentData extends object>(
        url: string,
        data: DocumentData
    ): Promise<PostResponse> {
        try {
            // Clean data using removeUndefinedProperties method
            const cleanedData = this.removeUndefinedProperties(data);

            // Ensure the cleanedData matches the expected type for Firestore
            const firestoreData: WithFieldValue<DocumentData> =
                cleanedData as WithFieldValue<DocumentData>;

            // Add the cleaned data to the Firestore collection
            const record = await addDoc(collection(this.db, url), firestoreData);
            const docRef = doc(this.db, url, record.id);
            await setDoc(docRef, { id: record.id, uid: this.userId }, { merge: true });

            return {
                docId: record.id,
            };
        } catch (error) {
            console.error('Error adding document:', error);
            throw new Error('Failed to add document');
        }
    }

    public static async update<DocumentData extends object>(
        url: string,
        data: DocumentData,
        docId: string
    ): Promise<PostResponse> {
        try {
            const cleanedData = this.removeUndefinedProperties(data);

            // Ensure the cleanedData matches the expected type for Firestore
            const firestoreData: WithFieldValue<DocumentData> =
                cleanedData as WithFieldValue<DocumentData>;

            // Add the cleaned data to the Firestore collection
            const docRef = doc(this.db, url, docId);
            await updateDoc(docRef, firestoreData);

            return {
                docId: docRef.id,
            };
        } catch (error) {
            console.error('Error updating document:', error);
            throw new Error('Failed to update document');
        }
    }

    public static async delete(url: string, docId: string) {
        try {
            await deleteDoc(doc(this.db, url, docId));
        } catch (error) {
            console.error('Error deleting document:', error);

            throw new Error('Failed to delete document.');
        }
    }
}
