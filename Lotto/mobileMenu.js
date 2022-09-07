//mobile menu button
var menuBtn = document.getElementById('menuBtn');
var menu = document.getElementById('menu');
var closeMenuBtn = document.getElementById('closeMenuBtn');


// Menu button click event handler
menuBtn.onclick = function() {
    menu.classList.add('show');
};

// Close menu button click event handler
closeMenuBtn.onclick = function() {
    menu.classList.remove('show');
};
