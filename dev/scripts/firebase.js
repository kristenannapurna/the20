import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDAHkw16Q2FrDK2LN3OTUN2aDzkdifBC1E",
  authDomain: "the20-57726.firebaseapp.com",
  databaseURL: "https://the20-57726.firebaseio.com",
  projectId: "the20-57726",
  storageBucket: "",
  messagingSenderId: "629370004050"
};

  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();

  export const auth = firebase.auth();

  export default firebase;
