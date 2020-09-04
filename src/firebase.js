import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCIsUpsFVKJBwiDabNgGZ1D0fv42qA6k0c",
    authDomain: "insta-clone-e7454.firebaseapp.com",
    databaseURL: "https://insta-clone-e7454.firebaseio.com",
    projectId: "insta-clone-e7454",
    storageBucket: "insta-clone-e7454.appspot.com",
    messagingSenderId: "315299857070",
    appId: "1:315299857070:web:4129138142e7f2e8fd233f",
    measurementId: "G-1J27855H3F"
  })

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };
