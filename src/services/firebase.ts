import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration from firebase.json
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: 'elite-customer-8b70c.firebaseapp.com',
    projectId: 'elite-customer-8b70c',
    storageBucket: 'elite-customer-8b70c.appspot.com',
    messagingSenderId: '644499023081',
    appId: '1:644499023081:web:5eaecb7ffa88ba769abc78',
};

// Check if we're in demo mode (no real API key)
export const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key' ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your-firebase-api-key-here';

// Initialize Firebase only if we have a valid config
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
} catch (error) {
    console.warn('Firebase initialization failed:', error);
    console.warn('Running in demo mode without Firebase backend');
}

export { app, auth, storage };
export default app;
