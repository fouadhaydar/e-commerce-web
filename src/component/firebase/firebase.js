import { initializeApp } from "firebase/app";
// for firestore and database information
import { getFirestore } from 'firebase/firestore'

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC6_Lb5rENj6y9lu2kpSphaw5In-oxX-4I",
    authDomain: "furniture-e-commerce-5afe0.firebaseapp.com",
    projectId: "furniture-e-commerce-5afe0",
    storageBucket: "furniture-e-commerce-5afe0.appspot.com",
    messagingSenderId: "367125608480",
    appId: "1:367125608480:web:17b4d850c7aa9bf1522445",
    measurementId: "G-CC5ELX09C7"
};

initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()

// google auth
const provider = new GoogleAuthProvider();


export {auth, provider};
export default db
