import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

export class FirebaseService {
    private static app: FirebaseApp | null;

    private static readonly firebaseConfig = {
        apiKey: 'AIzaSyBZ_l71RgUQoQ3a8bVjTMrTs64v-gqm3hM',
        authDomain: 'car-me-info.firebaseapp.com',
        projectId: 'car-me-info',
        storageBucket: 'car-me-info.appspot.com',
        messagingSenderId: '885918523909',
        appId: '1:885918523909:web:09f1a73173aa799591726c',
        measurementId: 'G-M8EP3V3S58',
    };

    public static getInstance() {
        if (!this.app) {
            this.app = initializeApp(this.firebaseConfig);
        }
        return this.app;
    }
}
