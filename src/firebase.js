import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDC5p2uy7vUVcoWMM26ECT3ABVQiRXQXMc',
  authDomain: 'good-stuff-book-club.firebaseapp.com',
  databaseURL: 'https://good-stuff-book-club.firebaseio.com',
  projectId: 'good-stuff-book-club',
  storageBucket: 'good-stuff-book-club.appspot.com',
  messagingSenderId: '687536179760',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
