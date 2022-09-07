//Firebase app setup
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";



//Siit saan funktsioone
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration Firebase ühendamine
const firebaseConfig = {
    apiKey: "AIzaSyCq7s91DZwK9r9L4bDaMQNeswMnYzX1Rmk",
    authDomain: "christmas-raffle.firebaseapp.com",
    projectId: "christmas-raffle",
    storageBucket: "christmas-raffle.appspot.com",
    messagingSenderId: "317495462918",
    appId: "1:317495462918:web:6cded5889db33a17e74787"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Authentication related functions //Impordin funktsiiooni getAuth firebaset authntimise jaoks.

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";



export {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut

}
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";