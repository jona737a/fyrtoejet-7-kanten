import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvdjPK1VuVSGyF878lBkM022jlgjba3gc",
    authDomain: "fyrtoejet-eb6bc.firebaseapp.com",
    projectId: "fyrtoejet-eb6bc",
    storageBucket: "fyrtoejet-eb6bc.appspot.com",
    messagingSenderId: "784980946245",
    appId: "1:784980946245:web:c7667ebed9ab66e0bfa22c"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
  export const auth = firebase.auth()
  export const usersCollection = db.collection('users')