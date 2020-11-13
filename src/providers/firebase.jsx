import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from '../config.js';

const firebaseConfig = {
  ...config.firebase
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();