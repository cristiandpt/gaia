// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestoe } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq6BhIKPGGBLIPVS_YzuXWuIesmN7VtcA",
  authDomain: "gaia-804ff.firebaseapp.com",
  projectId: "gaia-804ff",
  storageBucket: "gaia-804ff.appspot.com",
  messagingSenderId: "110760041728",
  appId: "1:110760041728:web:b402debe8b2cdc1d0167e5",
  measurementId: "G-1QZYP7M8Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth =getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(app);