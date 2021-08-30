import firebase from "firebase";
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4hpw4hO6xeFgJNl0Uumf7I5Pg1rDin14",
    authDomain: "farmfresh-3f4bc.firebaseapp.com",
    projectId: "farmfresh-3f4bc",
    storageBucket: "farmfresh-3f4bc.appspot.com",
    messagingSenderId: "976044687609",
    appId: "1:976044687609:web:70ab331251f42a21c5e228",
    measurementId: "G-H3YMWFZN0Y"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
  const db =  app.firestore()
  const storage = app.storage()

  export {db, storage}