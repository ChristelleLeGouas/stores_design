const overlay = document.querySelector('.overlay');
if (overlay) {
  overlay.addEventListener('click', () => {
    alert('Bienvenue sur le site de notre entreprise de luxe ! ✨');
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}
