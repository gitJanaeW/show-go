// for mobile menu
const navbarBurger = document.querySelector("#burger");
const navbarMenu = document.querySelector("#navbar-links");

function navbarToggle(e){
    e.preventDefault();
    navbarMenu.classList.toggle('is-active');
    navbarBurger.classList.toggle('is-active');
}

navbarBurger.addEventListener('click', navbarToggle);