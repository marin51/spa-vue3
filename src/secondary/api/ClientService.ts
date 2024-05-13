import { FirebaseService } from '@/utils/FirebaseService';
import {
    collection,
    addDoc,
    query,
    getDocs,
    WithFieldValue,
    getFirestore,
    where,
} from 'firebase/firestore';

type PostResponse = {
    data: {
        id: string;
    };
};

export class ClientService {
    private static readonly app = FirebaseService.getInstance();
    private static readonly db = getFirestore(this.app);

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
            // TODO: Improve this
            const userId = localStorage.getItem('user_id') || 'marinsk1';

            if (!userId) {
                console.error('Not such a user');
            }

            const q = query(collection(this.db, url), where('uid', '==', userId));
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
            const docRef = await addDoc(collection(this.db, url), firestoreData);
            console.log('Document written with ID:', docRef.id);
            return {
                data: {
                    id: docRef.id,
                },
            };
        } catch (error) {
            console.error('Error adding document:', error);
            throw new Error('Failed to add document');
        }
    }
}
