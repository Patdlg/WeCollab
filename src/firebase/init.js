import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCkUxLnV6v4eXOw1rFwbjwY5Ufg_zNFOLQ",
  authDomain: "artist-locator-cfb9b.firebaseapp.com",
  databaseURL: "https://artist-locator-cfb9b.firebaseio.com",
  projectId: "artist-locator-cfb9b",
  storageBucket: "",
  messagingSenderId: "712901328246"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
