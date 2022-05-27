import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA2pP7ky-yYpudQ8k87VAn6UzQwIJ6nMJA",
    authDomain: "project-reservation-abc94.firebaseapp.com",
    databaseURL: "https://project-reservation-abc94-default-rtdb.firebaseio.com",
    projectId: "project-reservation-abc94",
    storageBucket: "project-reservation-abc94.appspot.com",
    messagingSenderId: "286574025630",
    appId: "1:286574025630:web:56d4b324f7438ce4cbd48f",
    measurementId: "G-B1MWNB0XPY"
  });

export const storage = firebase.storage();

export const auth = firebaseConfig.auth();
  
export default firebaseConfig;