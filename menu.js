//For showing "MyLottery" sections for logged in users and hidding for logged out visitors

//For using firebase.js funktions
import * as firebase from "./firebase.js"

var myLotterysMenuItem = document.getElementById("hiddenMenuItemLoggedOut")

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.getAuth(firebase.app);

firebase.onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        //Show my lotterys menu item when user is signed in
        myLotterysMenuItem.style.display = "block";
        homeLink.style.display = "none"

    } else {
        // User is signed out and redirected to
        myLotterysMenuItem.style.display = "none";
        homeLink.style.display = "block";
    }
});