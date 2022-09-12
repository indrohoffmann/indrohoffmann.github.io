import * as firebase from "./firebase.js"



const querySnapshot = await firebase.getDocs(firebase.collection(firebase.db, "Lottos"));
querySnapshot.forEach((doc) => {
    //siia et creatiks uue elemendi kuidas doc datast saab nime end date jne.
    const auth = firebase.getAuth();
    const user = auth.currentUser;
    const createLottoBtnMylotteryPage = document.getElementById("createLottoBtnMylotteryPage");

    createLottoBtnMylotteryPage.onclick = function (e) {
        e.preventDefault(); //Preventing page refresh after signIn button pressed
        window.location.replace("createnewlotto.html");

    };

    //kontrollib et oleksid nähtaval ainult kasutaja omad lotod
    if (user.uid == doc.data().creator) {
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

    } else {

        document.getElementById('myCreatedLotterysNotCreatedYet').style.display = 'block';
    }


});