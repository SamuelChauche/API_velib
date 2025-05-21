import { apikey } from "./config.js";

const map = L.map("map").setView([48.8566, 2.3522], 13);

const WEATHER_API_URL = `https://api.weatherbit.io/v2.0/forecast/hourly?city=paris&key=${apikey}&hours=8`;
const API_URL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=20';

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const fetchAndDisplayWeather = async () => {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();

        const weatherContainer = document.getElementById("weather-info");
        const forecasts = data.data.slice(0, 8); // Les 8 prochaines heures

        let forecastHTML = `
            <div style="padding: 10px; border-radius: 5px;">
            <h2 style="text-align:center;">🌤️ Prévisions météo</h2>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
        `;

        forecasts.forEach(hour => {
            const date = new Date(hour.timestamp_local);
            const hours = date.getHours().toString().padStart(2, '0');

            forecastHTML += `
                <div style="min-width: 100px; display: grid; grid-template-rows: auto auto auto auto; justify-items: center; text-align: center;">
                    <div><p>${hours}h</p></div>
                    <div><img src="https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png" alt="${hour.weather.description}" width="50" height="50" /></div>
                    <div><p>🌡️ : <strong>${hour.temp}°C</strong></p></div>
                    <div><p>💨 : ${hour.wind_spd} m/s</p></div> 
                </div>
            `;
        });

        forecastHTML += `</div></div>`;
        weatherContainer.innerHTML = forecastHTML;

    } catch (error) {
        console.error("💥 Erreur météo :", error.message);
    }
};

fetchAndDisplayWeather();
setInterval(fetchAndDisplayWeather, 60 * 60 * 1000);


const showVelibStation = (name, mechanicals, ebikes, numdocksavailable) => {
    return `
    <div id="station-card" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
    <h2>${name}</h2>
    <p>🔧 Vélibs mécaniques : ${mechanicals ?? 0}</p>
            <p>⚡ Vélibs électriques : ${ebikes ?? 0}</p>
            <p>🅿️ Docks disponibles : ${numdocksavailable ?? 0}</p>
        </div>
    `;
};

const fetchAndDisplayStations = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const container = document.getElementById("station-container");
        if (!container) {
            console.error("📛 Élément HTML #station-container non trouvé.");
            return;
        }

        container.innerHTML = "";

        if (!data.records || data.records.length === 0) {
            container.innerHTML = "<p>❌ Aucune station trouvée.</p>";
            return;
        }

        data.records.forEach(record => {
            const fields = record.fields;
            if (!fields) return;

            const stationHTML = showVelibStation(
                fields.name,
                fields.mechanical,
                fields.ebike,
                fields.numdocksavailable
            );

            if (fields.coordonnees_geo) {
                const [lat, lon] = fields.coordonnees_geo;
                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(`
                        <b>${fields.name}</b><br>
                        🚲 Capacité : ${fields.capacity ?? 0} docks<br>
                        🔧 Mécaniques : ${fields.mechanical ?? 0}<br>
                        ⚡ Électriques : ${fields.ebike ?? 0}<br>
                        🅿️ Places libres : ${fields.numdocksavailable ?? 0}
                    `);
            }

            container.innerHTML += stationHTML;
        });

    } catch (error) {
        console.error("💥 Erreur de récupération :", error.message);
    }
};

fetchAndDisplayStations();
setInterval(fetchAndDisplayStations, 60 * 1000);


