//Uue loto loomiseks
//et kasutada firebase funktsioone firebase.js iset
import * as firebase from "./firebase.js"


let lotterysName = document.querySelector("#lotterysName");
let lotterysEndDate = document.querySelector("#lotterysEndDate");
let lotterysDescription = document.querySelector("#lotterysDescription");
let createNewLotteryBtn = document.querySelector("#createNewLotteryBtn");

// Initialize Firebase Authentication and get a reference to the service


createNewLotteryBtn.onclick = async function (e) {
    e.preventDefault(); //Preventing page refresh after signIn button pressed

    //try proovib lisada dokumenti
    try {
        //Selleks et kätte saada lotto looja/creator
        const auth = firebase.getAuth();
        const user = auth.currentUser;
        //Siin kontrollib kas user olemas
        if (user !== null) {
            const uid = user.uid;
            //dokumendi referets dokumendi andmed
            const docRef = await firebase.addDoc(firebase.collection(firebase.db, "Lottos"), {
                lotterysName: lotterysName.value,
                lotterysEndDate: lotterysEndDate.value,
                lotterysDescription: lotterysDescription.value,
                creator: uid,
                participants: []
            });
            console.log("www.lotto.com/joinLotto.html?lottoID=", docRef.id);
            window.location.replace("lotto.html?ID=" + docRef.id);
        }

    } catch (e) {
        console.error("Error adding document: ", e);
    }

    console.log(lotterysName.value, lotterysEndDate.value, lotterysDescription.value);

    alert("Congrats... New lottery created")
    //clear input fields after submiting information
    lotterysName.value = '';
    lotterysEndDate.value = '';
    lotterysDescription.value = '';
};