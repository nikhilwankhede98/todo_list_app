import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // For authentication
import 'firebase/compat/firestore'; // For Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAlmWy1G0u4UW6jMSkedlmbViOvRNd2Mr8",
  authDomain: "to-do-list-react-d9e93.firebaseapp.com",
  databaseURL: "https://to-do-list-react-d9e93-default-rtdb.firebaseio.com",
  projectId: "to-do-list-react-d9e93",
  storageBucket: "to-do-list-react-d9e93.appspot.com",
  messagingSenderId: "442526017380",
  appId: "1:442526017380:web:e5a6950c8799bcd822bc71",
  measurementId: "G-GH3798TDW3"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();