import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBGWWhqVABpBSUEpvrsuUs27JzFZe1W0JM",
    authDomain: "montue-app.firebaseapp.com",
    projectId: "montue-app",
    storageBucket: "montue-app.firebasestorage.app",
    messagingSenderId: "329142333120",
    appId: "1:329142333120:web:ccc8de0161e500d2014725"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);