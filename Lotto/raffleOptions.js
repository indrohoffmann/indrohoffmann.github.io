//Selleks et saada kätte konkreetse lotto infot
import * as firebase from "./firebase.js"

//et saada parameereid kätte lingist
let params = new URLSearchParams(document.location.search);


//oootab just ID nimega parameetrit et siis muid parameetried ei kuula
let lottoID = params.get("ID");

const docRef = firebase.doc(firebase.db, "Lottos", lottoID);
const docSnap = await firebase.getDoc(docRef);
//Script for starting raffle
let startRaffle = document.getElementById("startRaffle");


//saame osalejad kätte databasest
const participantsFromDatabase = docSnap.data().participants;

startRaffle.onclick = function (e) {
    e.preventDefault(); //Preventing page refresh after signIn button pressed


    console.log(participantsFromDatabase)
    //Kontrollib kas on yldse kasutajaid liitund
    if (participantsFromDatabase.length > 1) {
        //lisame false kasutajale
        participantsFromDatabase.forEach((oneParticipant) => {
            oneParticipant.loositud = false
            console.log(oneParticipant)
        });
        participantsFromDatabase.forEach((oneParticipant) => {
            //filtreerim arrayst välja kes ei ole tema ise ja looosi seisund on true
            let filteredParticipants = participantsFromDatabase.filter((participant) => {
                return participant.loositud == false && participant.email != oneParticipant.email
            })
            let randomUser = getRandomIntInclusive(0, filteredParticipants.length - 1)
            filteredParticipants[randomUser].loositud = true
            oneParticipant.result = filteredParticipants[randomUser]
            console.log(randomUser)
        });
        //Display results
        let lottoResults = document.getElementById('lottoResults')

        participantsFromDatabase.forEach((oneParticipant) => {
            let participantsIntoList = document.createElement('li');
            participantsIntoList.innerText = oneParticipant.name + " - " + oneParticipant.result.name;
            lottoResults.appendChild(participantsIntoList);
            console.log(oneParticipant)
        });



        console.log(participantsFromDatabase)
    }

    //Et see foreach siis teeb iga array elemendi kohta käivitab siis selle funkstioooni mis on arrov functioni sees


};

//Getting a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}