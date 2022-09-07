//Selleks et saada kätte konkreetse lotto infot
import * as firebase from "./firebase.js"

let joinName = document.querySelector("#joinName");
let joinEmail = document.querySelector("#joinEmail");
let joinBtn = document.querySelector("#joinBtn");

//et saada parameereid kätte lingist
let params = new URLSearchParams(document.location.search);

//oootab just ID nimega parameetrit et siis muid parameetried ei kuula
let lottoID = params.get("ID");

//kust kohast ja millist documenti tahan saada
const docRef = firebase.doc(firebase.db, "Lottos", lottoID);
const docSnap = await firebase.getDoc(docRef);

//Et kui dokument eksisteerib siis...
if (docSnap.exists()) {

    const lotteryNameTable = document.getElementById("lotteryNameTable");
    const lotteryDadeTable = document.getElementById("lotteryDadeTable");
    const lotteryDescriptionTable = document.getElementById("lotteryDescriptionTable");

    //doc.data on siis tabeli sisu. .docSnap.data().lotterysName on siis json data firebasest.
    lotteryNameTable.textContent = docSnap.data().lotterysName;
    lotteryDadeTable.textContent = docSnap.data().lotterysEndDate;
    lotteryDescriptionTable.textContent = docSnap.data().lotterysDescription;

} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
};

joinBtn.onclick = async function (e) {
    e.preventDefault(); //Preventing page refresh after signIn button pressed

    //"Spread operator" updatimse asemel kopeerib eelnevad osalejad muidu ilma selleta kirjutaks lihtsalt yle.
    await firebase.updateDoc(docRef, {
        participants: [...docSnap.data().participants, {
            name: joinName.value,
            email: joinEmail.value
        }]

    });

    window.location.replace("thanksforjoining.html");
}