import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBNSOI2Y-4IEufrvH8mBkTwZJ4RkRigVlA",
    authDomain: "whatsapp-rajat.firebaseapp.com",
    projectId: "whatsapp-rajat",
    storageBucket: "whatsapp-rajat.appspot.com",
    messagingSenderId: "719001783759",
    appId: "1:719001783759:web:4b6857ccf119eaf3e056ba"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default db;