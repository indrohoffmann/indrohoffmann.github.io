//et kasutada firebase funktsioone firebase.js iset
import * as firebase from "./firebase.js"

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.getAuth(firebase.app);

let email = document.querySelector("#email")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#registerBtn")


//register account
registerBtn.onclick = function (e) {
  e.preventDefault();
  firebase.createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // Selleks et lisada nimi andmebaasi

      firebase.updateProfile(user, {
        displayName: firstName.value + " " + lastName.value,
      }).then(() => {
        console.log("Sucssessful account")
        // Profile updated!
        // ...
        //after registering new userd directed to creating new lottery
        window.location.replace("createnewlotto.html");

      }).catch((error) => {
        // An error occurred
        // ...
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

};