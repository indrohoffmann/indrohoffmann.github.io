//For showing username and logout button

//For using functions from firebase.js
import * as firebase from "./firebase.js"

var loggedInUser = document.getElementById('loggedInUser');
var loggingOut = document.getElementById("loggingOut");
var signInLink = document.getElementById("signInLink");
var wrapper = document.getElementById("wrapper");
var loadingIndicator = document.getElementById("loadingIndicator");


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.getAuth(firebase.app);

firebase.onAuthStateChanged(auth, (user) => {
    wrapper.style.display = "block";
    loadingIndicator.style.display = "none";



    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        const uid = user.uid;
        loggedInUser.innerText = user.displayName
        loggedInUser.style.display = "block";
        loggedInUser.removeAttribute("href");
        loggingOut.style.cursor = "pointer";
        signInLink.style.display = "none";
        loggingOut.style.display = "block";

    } else {
        // User is signed out and redirected to
        loggedInUser.style.display = "none";
        loggingOut.style.display = "none";
        signInLink.style.display = "block";
    }
});



//logging out 
loggingOut.onclick = function (e) {
    e.preventDefault(); //Preventing page refresh after button pressed
    firebase.signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}