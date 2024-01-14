import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJLzuoEHVaUZ79IGuFwN-palriSQoOz0o",
    authDomain: "ncars-80f44.firebaseapp.com",
    projectId: "ncars-80f44",
    storageBucket: "ncars-80f44.appspot.com",
    messagingSenderId: "16467823009",
    appId: "1:16467823009:web:7cb10fc4051cde805d63e0",
    measurementId: "G-DS8QW7MWZ6"
  };



const myapp = initializeApp(firebaseConfig);
const auth = getAuth(myapp);
const dbf = getFirestore(myapp);



export  {
  dbf,
  myapp,
  auth
};
