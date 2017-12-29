import firebase from 'firebase';

// Initialize Firebase
var config = {
      apiKey: "AIzaSyD3XqP9FCA1YBh4j3cRx2CewVg0_An6g_k",
    authDomain: "the20-505fc.firebaseapp.com",
    databaseURL: "https://the20-505fc.firebaseio.com",
    projectId: "the20-505fc",
    storageBucket: "the20-505fc.appspot.com",
    messagingSenderId: "766508857975"
  };

  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();

  export const auth = firebase.auth();

  export default firebase;
