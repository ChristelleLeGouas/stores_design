// --- Overlay ---
const overlay = document.querySelector(".overlay");
if (overlay) {
  overlay.addEventListener("click", () => {
    alert("Bienvenue sur le site de notre entreprise de luxe ! ✨");
  });
}

// --- Menu hamburger ---
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// --- Logos partenaires ---
const logosPartenaires = [
  "Bandalux.png",
  "logo.png",
  "Futurol.png",
  "matest.webp",
  "amb.webp",
  "Luxaflex.png",
  "Somfy.png"
];

// --- URL de ton Apps Script ---
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzyoCMuLoP2BF8_YdoBnf2srHcVk-219Ttj1Ri5OY-XBsdH3XsCkZf1To-I5ht8Uqk7/exec";

// --- Ajouter un projet via POST ---
function ajouterProjet() {
  const nouveauProjet = {
    id: "99",
    Titre: "Projet Test",
    Description: "Un projet ajouté via POST",
    Image: "https://picsum.photos/400/300"
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(nouveauProjet),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(result => {
      if (result.result === "success") {
        alert("Projet ajouté avec succès !");
        chargerProjets();
      } else {
        console.error("Erreur serveur POST :", result.message);
        alert("Erreur lors de l'ajout du projet !");
      }
    })
    .catch(err => {
      console.error("Erreur POST :", err);
      alert("Impossible de contacter le serveur !");
    });
}

// --- Charger les projets ---
function chargerProjets() {
  const container = document.getElementById("liste-projets");
  container.innerHTML = '<div class="loader"></div>';

  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>Aucun projet disponible pour le moment.</p>";
        return;
      }

      data.forEach(projet => {
        const titre = projet.Titre || "Titre manquant";
        const description = projet.Description || "";
        const image = projet.Image || "https://via.placeholder.com/400x300?text=Pas+d'image";

        const card = document.createElement("div");
        card.classList.add("projet");
        card.innerHTML = `
          <img src="${image}" alt="${titre}" />
          <h3>${titre}</h3>
          <p>${description}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erreur GET :", err);
      container.innerHTML = "<p>Impossible de charger les projets.</p>";
    });
}

// --- Afficher logos partenaires ---
function afficherPartenaires() {
  const container = document.getElementById("liste-partenaires");
  container.innerHTML = "";

  logosPartenaires.forEach(filename => {
    const img = document.createElement("img");
    img.src = `img/${filename}`;
    img.alt = "Logo partenaire";
    img.classList.add("logo-partenaire");
    container.appendChild(img);
  });
}

// --- Initialisation ---
document.addEventListener("DOMContentLoaded", () => {
  chargerProjets();
  afficherPartenaires();
});
