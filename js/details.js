//navbar mobile
const burgerIcon = document.querySelector('#burger');
const navbarM = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarM.classList.toggle('is-active');
});