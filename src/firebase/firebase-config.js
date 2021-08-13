import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDucmvYkvU5YVS0myJWgzogJ8618hDADbQ",
    authDomain: "react-journal-app-e0e3f.firebaseapp.com",
    projectId: "react-journal-app-e0e3f",
    storageBucket: "react-journal-app-e0e3f.appspot.com",
    messagingSenderId: "1032742055800",
    appId: "1:1032742055800:web:59a6cb9cb5ca8993c2a28d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
