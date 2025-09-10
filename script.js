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

// Fonction pour ajouter un projet via POST
function ajouterProjet() {
  const postUrl = 'https://script.google.com/macros/s/TON_DEPLOYMENT_ID/exec';

  const nouveauProjet = {
    id: "3",
    Titre: "Projet C",
    Description: "Un projet ajouté via POST",
    Image: "https://drive.google.com/uc?export=view&id=TON_IMAGE_ID"
  };

  fetch(postUrl, {
    method: "POST",
    body: JSON.stringify(nouveauProjet),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(result => {
    console.log("Projet ajouté :", result);
    alert("Projet ajouté avec succès !");
  })
  .catch(error => {
    console.error("Erreur lors de l'ajout :", error);
  });
}

// URL de l'API GET
const getUrl = 'https://script.google.com/macros/s/AKfycby8ZidoVpJo68Zfg4uZw4to8nHBkL6agfMErVN5ix5DfqoqkxbKQFP43qahcltpRGyo/exec';

fetch(getUrl)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('liste-projets');
    const headers = data[0];
    const rows = data.slice(1);

    rows.forEach(row => {
      const projet = {};
      row.forEach((value, index) => {
        projet[headers[index]] = value.trim();
      });

      console.log("Image URL:", projet.Image);

      const card = document.createElement('div');
      card.classList.add('projet');
      card.innerHTML = `
        <img src="${projet.Image}" alt="${projet.Titre}" />
        <h3>${projet.Titre}</h3>
        <p>${projet.Description}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error(error));
