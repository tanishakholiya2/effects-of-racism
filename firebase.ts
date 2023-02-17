import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAZn1sRFumzPKdqvILf-w5xAO7szeOVkjQ",
    authDomain: "litpersonalproject.firebaseapp.com",
    projectId: "litpersonalproject",
    storageBucket: "litpersonalproject.appspot.com",
    messagingSenderId: "382874075420",
    appId: "1:382874075420:web:b5cddbe908a88b04a6fad9",
    measurementId: "G-DPTBDB1EXH"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);