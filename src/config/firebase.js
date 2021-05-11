import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import { FirebaseConfig } from './constants';

let firebaseApp;

if (firebase.apps.length) {
    firebaseApp = firebase.apps[0];
} else {
    firebaseApp = firebase.initializeApp(FirebaseConfig);
}

const db = firebaseApp.firestore();
const { Timestamp } = firebase.firestore;
export default db;
export { Timestamp, firebase };
