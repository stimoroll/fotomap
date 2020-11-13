import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from '../config/config.js';

const saveToCloud = (info) => {
  firebase.initializeApp(config.firebase);
  firebase.firestore();
  console.log("info", info);
  let id = info.id;
  delete info.id;
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const userRef = db.collection('fotos').add({
    ...info
  });
  console.log(userRef);
}


export default saveToCloud;