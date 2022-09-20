//Selleks et saada kätte konkreetse lotto infot
import * as firebase from "./firebase.js"

//For getting link parameters
let params = new URLSearchParams(document.location.search);


//Waiting dpecificly parameter with name "ID" Does not listen other parameters
let lottoID = params.get("ID");

const docRef = firebase.doc(firebase.db, "Lottos", lottoID);
const docSnap = await firebase.getDoc(docRef);
//Script for starting raffle
let startRaffle = document.getElementById("startRaffle");


//Getting participants from database
const participantsFromDatabase = docSnap.data().participants;

startRaffle.onclick = function (e) {
    e.preventDefault(); //Preventing page refresh after signIn button pressed


    console.log(participantsFromDatabase)
    //Checking is there any users joined with lotto
    if (participantsFromDatabase.length > 1) {
        //Adding false for user
        participantsFromDatabase.forEach((oneParticipant) => {
            oneParticipant.loositud = false
            console.log(oneParticipant)
        });
        participantsFromDatabase.forEach((oneParticipant) => {
            //filtreerim arrayst välja kes ei ole tema ise ja looosi seisund on true Filtering out of array user that is not himself and when raffle status is true
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




};

//Getting a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}