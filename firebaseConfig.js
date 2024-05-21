import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFUzhUTIMYfwA5QOoQj8eMA3mtV0ipwBw",
  authDomain: "elderly-care-fbd02.firebaseapp.com",
  projectId: "elderly-care-fbd02",
  storageBucket: "elderly-care-fbd02.appspot.com",
  messagingSenderId: "961476328725",
  appId: "1:961476328725:web:5c6bdd38c1a1b9e9113d1c",
  measurementId: "G-QKQT70YYY7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
