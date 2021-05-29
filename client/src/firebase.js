import firebase from "firebase";

const firebaseConfig = {
   apiKey: "AIzaSyDnW4SEAyQicNIqQM5JbasavUNm9_qSrYc",
   authDomain: "clone-1b859.firebaseapp.com",
   projectId: "clone-1b859",
   storageBucket: "clone-1b859.appspot.com",
   messagingSenderId: "197516979432",
   appId: "1:197516979432:web:5fc71f8690d0f0ce26ad5d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};
