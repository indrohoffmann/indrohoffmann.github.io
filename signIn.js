//et kasutada firebase funktsioone firebase.js iset
import * as firebase from "./firebase.js"

let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signInBtn = document.querySelector("#signInBtn");


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.getAuth(firebase.app);

//authentication
signInBtn.onclick = function (e) {
    e.preventDefault(); //Preventing page refresh after signIn button pressed
    firebase.signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {

            // Signed in 
            window.location.replace("mylotterys.html");

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("passwordMessage").innerHTML = "*Incorrect password"
            passwordMessage.style.color = "red";
        });
};