var contactLink = document.getElementById('contactLink');
var closeWindow = document.getElementById('contactCloseBtn');
var contactConfirm = document.getElementById('contactConfirm');
var confirmClosetBtn = document.getElementById('confirmCloseBtn');



contactLink.onclick = function () {
    document.getElementById('contactBox').style.display = "block";
    /* body.classList.add('backStyle');*/
}

closeWindow.onclick = function () {
    document.getElementById('contactBox').style.display = "none";
    /* body.classList.remove('backStyle')*/
}


var contactform = document.getElementById('contactform')
contactform.addEventListener('submit', function (e) {
    e.preventDefault()
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var message = document.getElementById('message').value

    fetch("http://vunki.eu:8000/mail", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                message: message,
                email: email
            }),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        })
        .then(function (response) {
            if (response.status == 200) {
                console.log('Mail sent')
                document.getElementById('contactConfirm').style.display = "block";
            } else {
                response.json().then(function (data) {
                    console.log(data.error)
                })
            }
        })
    confirmClosetBtn.onclick = function () {
        document.getElementById('contactConfirm').style.display = "none";
        document.getElementById('contactBox').style.display = "none";

    }
})