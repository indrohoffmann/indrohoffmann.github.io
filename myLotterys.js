import * as firebase from "./firebase.js"

const auth = firebase.getAuth(firebase.app);
let userCurrent


firebase.onAuthStateChanged(auth, (user) => {
    if (user) {
        userCurrent = user
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
    }
});

const querySnapshot = await firebase.getDocs(firebase.collection(firebase.db, "Lottos"));

//Filtering Lottos for current user
const filterdLottos = querySnapshot.docs.filter((doc) => {
    return userCurrent.uid == doc.data().creator
})

const createLottoBtnMylotteryPage = document.getElementById("createLottoBtnMylotteryPage");

createLottoBtnMylotteryPage.onclick = function (e) {
    e.preventDefault(); //Preventing page refresh after signIn button pressed
    window.location.replace("createnewlotto.html");
};

filterdLottos.forEach((doc) => {

    //Checking for only lotos wich belong to current loogged in user

    const myCreatedLotterys = document.getElementById("myCreatedLotterys");
    let newListElement = document.createElement('li');
    newListElement.classList.add("list-group-item")
    let newListItem = document.createElement('a');
    //doc.data on siis tabeli sisu
    newListItem.textContent = doc.data().lotterysName;

    //et lotto nimed olekss lingid ja lisab lingile parameetri ID kaasa
    newListItem.href = "lotto.html?ID=" + doc.id;

    newListElement.appendChild(newListItem);
    myCreatedLotterys.appendChild(newListElement);

    console.log(`${doc.id} => ${doc.data().toString()}`);

    document.getElementById('myCreatedLotterysNotCreatedYet').style.display = 'none';

});

if (filterdLottos.length < 1) {
    document.getElementById('myCreatedLotterysNotCreatedYet').style.display = 'block';
}



console.log(filterdLottos)