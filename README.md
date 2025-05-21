# 🚲 Vélib' Paris + Météo ☁️

Une application web simple qui affiche les stations Vélib' à Paris en temps réel, avec leur disponibilité (vélo mécaniques, électriques, docks), une carte interactive grâce à **Leaflet.js**, et la météo actuelle avec icône via **Weatherbit.io**.

---

## 🔧 Fonctionnalités

- 📍 Carte interactive avec **Leaflet** montrant les stations Vélib'.
- 🔄 Données mises à jour toutes les 60 secondes.
- 🌤️ Affichage de la météo en temps réel pour Paris (température, vent, icône) à intervalle de 60 minutes sur 8 heures.
- ✅ Interface simple et responsive.

---

## 📦 Technologies utilisées

- HTML / CSS / JavaScript
- [Leaflet.js](https://leafletjs.com/)
- [Weatherbit API](https://www.weatherbit.io/)
- [OpenData Paris (API Vélib')](https://opendata.paris.fr/)

---

## 🚀 Installation

1. **Clone** ce repo :

```bash
git clone https://github.com/ton-utilisateur/velib-meteo.git
cd velib-meteo
````

2. **Crée un fichier `config.js`** à la racine du dossier `src/` avec :

```js
export const apikey = "VOTRE_CLÉ_API_WEATHERBIT";
```

3. Ouvre `index.html` dans ton navigateur :

```bash
open index.html
```

> 💡 Tu peux aussi utiliser [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) sur VSCode pour du rechargement auto.

---

## 📁 Arborescence

```
velib-meteo/
├── index.html
├── style.css
├── main.js
├── config.js       ← à créer avec ta clé API
├── README.md
└── /assets
```

---

## 🔑 Obtenir une clé Weatherbit

1. Va sur [https://www.weatherbit.io/](https://www.weatherbit.io/)
2. Crée un compte
3. Récupère ta clé dans ton dashboard
4. Colle-la dans `config.js`

---

## 🗺️ Carte Leaflet

La carte est centrée sur Paris (`48.8566, 2.3522`) avec un zoom de niveau `13`.
Chaque station est marquée et affiche des infos dans un popup au clic.

---

## 📌 À faire / Idées futures

* [ ] Filtrer les stations par arrondissement
* [ ] Ajouter une légende de disponibilité
* [ ] Ajout de thèmes (mode nuit ?)
* [ ] Stocker les favoris avec `localStorage`

---

## 🤝 Contribuer

Les PRs sont les bienvenues !
N'hésite pas à ouvrir une issue pour signaler un bug ou proposer une fonctionnalité.

---

## 📄 Licence

Projet open-source sous [MIT License](LICENSE).

---

## 🧑‍💻 Auteur

Développé avec ❤️ par \[Ton Prénom]
👉 [ton-portfolio.com](https://ton-portfolio.com)

```

---

