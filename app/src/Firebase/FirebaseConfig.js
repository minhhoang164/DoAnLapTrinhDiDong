import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyA2B3iLkS_QJPQkAW84aG69hrK3ipLEkRI",
    authDomain: "foodappvn.firebaseapp.com",
    projectId: "foodappvn",
    storageBucket: "foodappvn.appspot.com",
    messagingSenderId: "580947492996",
    appId: "1:580947492996:web:998af539d52a1639b942d1"

};
//Intialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}
