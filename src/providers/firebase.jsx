import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from '../config/config';

export const firedb = !firebase.apps.length ? firebase.initializeApp(config.firebase).firestore() : firebase.app().firestore();
export const db = firedb.collection(config.defaults.firebaseCollection);