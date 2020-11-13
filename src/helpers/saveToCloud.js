import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from '../config/config.js';
import { db } from '../providers/firebase';

const saveToCloud = info => {
  const userRef = db.doc(info.asset_id).set({
    ...info
  })
  .then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}


export default saveToCloud;