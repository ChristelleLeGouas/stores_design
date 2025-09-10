// Overlay d'accueil
const overlay = document.querySelector('.overlay');
if (overlay) {
  overlay.addEventListener('click', () => {
    alert('Bienvenue sur le site de notre entreprise de luxe ! ✨');
  });
}

// Menu hamburger
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => menu.classList.toggle('active'));
}

// Ajouter un projet via POST
function ajouterProjet() {
  const postUrl = 'https://script.google.com/macros/s/AKfycbxAwbUeWiQagbqaIQqatdIxUido-0EwAi7QFy0WcO1SUQ51ETpe8_LlCQX-NCZ-IYc/exec';
  const nouveauProjet = {
    id: "3",
    Titre: "Projet C",
    Description: "Un projet ajouté via POST",
    Image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
  };

  fetch(postUrl, {
    method: "POST",
    body: JSON.stringify(nouveauProjet),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(() => afficherProjets())
  .catch(err => console.error("Erreur POST :", err));
}

// Afficher les projets depuis Google Sheet (sauter la ligne d’en-tête)
function afficherProjets() {
  const getUrl = 'https://script.google.com/macros/s/AKfycbxAwbUeWiQagbqaIQqatdIxUido-0EwAi7QFy0WcO1SUQ51ETpe8_LlCQX-NCZ-IYc/exec';
  const container = document.getElementById('liste-projets');
  container.innerHTML = '';

  fetch(getUrl)
    .then(res => res.json())
    .then(data => {
      if (!data || data.length <= 1) throw "Aucun projet trouvé";

      const headers = data[0]; // Ligne d’en-tête
      const rows = data.slice(1); // Toutes les lignes sauf la première

      rows.forEach(row => {
        const projet = {};
        row.forEach((val, i) => { projet[headers[i]] = val; });

        const card = document.createElement('div');
        card.classList.add('projet');
        card.innerHTML = `
          <img src="${projet.Image}" alt="${projet.Titre || 'Projet'}" />
          <h3>${projet.Titre || 'Sans titre'}</h3>
          <p>${projet.Description || ''}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(() => {
      // Projet test
      const card = document.createElement('div');
      card.classList.add('projet');
      card.innerHTML = `
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80" alt="Projet Test" />
        <h3>Projet Test</h3>
        <p>Description test avec image publique.</p>
      `;
      container.appendChild(card);
    });
}

// Appel initial au chargement
document.addEventListener("DOMContentLoaded", afficherProjets);
