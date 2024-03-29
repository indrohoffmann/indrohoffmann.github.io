//For getting information about certain raffle
import * as firebase from "./firebase.js"

//Getting parametes from link
let params = new URLSearchParams(document.location.search);


//Waiting dpecificly parameter with name "ID" Does not listen other parameters
let lottoID = params.get("ID");

//kust kohast ja millist documenti tahan saada
const docRef = firebase.doc(firebase.db, "Lottos", lottoID);
const docSnap = await firebase.getDoc(docRef);
const auth = firebase.getAuth();
const user = auth.currentUser;



//If the document exists then function starts
if (docSnap.exists()) {
    if (user.uid == docSnap.data().creator) {

        const lotteryNameTable = document.getElementById("lotteryNameTable");
        const lotteryDadeTable = document.getElementById("lotteryDadeTable");
        const lotteryDescriptionTable = document.getElementById("lotteryDescriptionTable");
        const linkForShare = document.getElementById("linkForShare");

        //doc.data is table content. .docSnap.data().lotterysName Is JSON data from firebase.
        lotteryNameTable.textContent = docSnap.data().lotterysName;
        lotteryDadeTable.textContent = docSnap.data().lotterysEndDate;
        lotteryDescriptionTable.textContent = docSnap.data().lotterysDescription;
        linkForShare.innerHTML = 'Share this link to invite people participate in raffle:  <a href="https://indrohoffmann.github.io/join.html?ID=' + lottoID + '">https://indrohoffmann.github.io/join.html?ID=' + lottoID + '</a>'




        //Getting participants from database
        const participantsFromDatabase = docSnap.data().participants;
        const lottoParticipantsTable = document.getElementById("lottoParticipantsTable");

        //Checking is there any participants joined
        if (participantsFromDatabase.length === 0) {

            console.log("There are no joined users jet")
            const lottoParticipantsList = document.getElementById("lottoParticipantsList")

            document.getElementById('lottoParticipantsTable').style.display = 'none';
            document.getElementById('lottoParticipantsList').style.display = 'block';

            lottoParticipantsList.innerHTML = "There are no users joined with this lottery jet";


        }

        //Et see foreach siis teeb iga array elemendi kohta käivitab siis selle funkstioooni mis on arrov functioni sees
        participantsFromDatabase.forEach((oneParticipant) => {
            let participantsIntoList = document.createElement('li');
            participantsIntoList.innerText = oneParticipant.name + " - " + oneParticipant.email;
            lottoParticipantsTable.appendChild(participantsIntoList);
            console.log(oneParticipant)
        });

    } else {
        window.location.replace("mylotterys.html");
    }

} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}