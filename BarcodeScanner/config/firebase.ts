// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import Constants from 'expo-constants';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDfbBfRVBMQ2LOcyijV3eIo8A1PqWWyLfo",
  authDomain: "barcode-63e42.firebaseapp.com",
  projectId: "barcode-63e42",
  storageBucket: "barcode-63e42.appspot.com",
  messagingSenderId: "265095917447",
  appId: "1:265095917447:web:56f149ed447c01e8c0ed22",
  measurementId: "G-33LDVS1BLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { app, database };