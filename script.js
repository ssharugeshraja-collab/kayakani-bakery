// =====================================================
// FIREBASE
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "kayakani-bakery.firebaseapp.com",
    projectId: "kayakani-bakery",
    storageBucket: "kayakani-bakery.firebasestorage.app",
    messagingSenderId: "861879891216",
    appId: "1:861879891216:web:a9c91ee27859ef9ef62195"
};

// Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
