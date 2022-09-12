//Selleks et hoida lubada kasutajat ligi teatud lehtedele
//et kasutada firebase funktsioone firebase.js iset
import * as firebase from "./firebase.js"

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.getAuth(firebase.app);

firebase.onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

  } else {
    // User is signed out and redirected to
    window.location.replace("index.html");
  }
});