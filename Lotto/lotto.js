//Selleks et saada kätte konkreetse lotto infot
import * as firebase from "./firebase.js"

//et saada parameereid kätte lingist
let params = new URLSearchParams(document.location.search);


//oootab just ID nimega parameetrit et siis muid parameetried ei kuula
let lottoID = params.get("ID");

//kust kohast ja millist documenti tahan saada
const docRef = firebase.doc(firebase.db, "Lottos", lottoID);
const docSnap = await firebase.getDoc(docRef);
const auth = firebase.getAuth();
const user = auth.currentUser;



//Et kui dokument eksisteerib siis...
if (docSnap.exists()) {
    if (user.uid == docSnap.data().creator) {

        const lotteryNameTable = document.getElementById("lotteryNameTable");
        const lotteryDadeTable = document.getElementById("lotteryDadeTable");
        const lotteryDescriptionTable = document.getElementById("lotteryDescriptionTable");
        const linkForShare = document.getElementById("linkForShare");

        //doc.data on siis tabeli sisu. .docSnap.data().lotterysName on siis json data firebasest.
        lotteryNameTable.textContent = docSnap.data().lotterysName;
        lotteryDadeTable.textContent = docSnap.data().lotterysEndDate;
        lotteryDescriptionTable.textContent = docSnap.data().lotterysDescription;
        linkForShare.innerHTML = 'Share this link to invite people participate in raffle:  <a href="http://127.0.0.1:5500/join.html?ID=' + lottoID + '">http://127.0.0.1:5500/join.html?ID=' + lottoID + '</a>'




        //saame osalejad kätte databasest
        const participantsFromDatabase = docSnap.data().participants;
        const lottoParticipantsTable = document.getElementById("lottoParticipantsTable");

        //Kontrollib kas on yldse kasutajaid liitund
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



//see töötav for each näide
/*const companies = ["Apple", "Google", "Facebook"];
        const lottoParticipantsTable = document.getElementById("lottoParticipantsTable")


        //loopiib läbi compnies "company" loon ise mis on yks item arrayst
       /* companies.forEach((company) => {
            let participantsIntoList = document.createElement('li');
            participantsIntoList.innerText = company;
            lottoParticipantsTable.appendChild(participantsIntoList);
            console.log(company);
        });

*/