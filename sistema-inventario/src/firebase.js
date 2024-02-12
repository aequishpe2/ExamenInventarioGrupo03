// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZJl-5E0r9vCJ0dhPXV1ygp72Out6f4h8",
  authDomain: "inventario-ee74d.firebaseapp.com",
  projectId: "inventario-ee74d",
  storageBucket: "inventario-ee74d.appspot.com",
  messagingSenderId: "92521295944",
  appId: "1:92521295944:web:8bb33e9da048e32ba1a87d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
