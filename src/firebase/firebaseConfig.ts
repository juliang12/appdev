// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfyMq9WElKWkUWIY6h27AaeiSBXi3O9DE",
  authDomain: "appdevs-c6e90.firebaseapp.com",
  projectId: "appdevs-c6e90",
  storageBucket: "appdevs-c6e90.appspot.com",
  messagingSenderId: "540695706959",
  appId: "1:540695706959:web:39783fca00f3e6dd5cd93a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
