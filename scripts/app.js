import tabJoursEnOrdre from "./joursSemaine.js";

console.log(tabJoursEnOrdre);
const clefApi = "0e62e973827690fddafa0ca13feefffd";
let resultApi;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.icone-chargement');



if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        appelApi(long,lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer.`)
    })
}

function appelApi(long,lat) {
    // console.log(long,lat);

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${clefApi}`)
    .then((reponse) => {
       return reponse.json(); 
    })
    .then ((data) => {
        console.log(data);

        resultApi = data;

        temps.innerText = resultApi.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultApi.current.temp)}°`;
        localisation.innerText = resultApi.timezone;


        //les heures par tranche de 3 + températures

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i*3;

            if(heureIncr > 24){
                heure[i].innerText = `${heureIncr - 24} h`
            }
            else if(heureIncr === 24){
                heure[i].innerText = "00 h"
            }
            else {
                heure[i].innerText = `${heureIncr} h`;
            }
            
        }

        // temps pour 3h

        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultApi.hourly[j*3].temp)}°`
        }


        // 3 premieres lettres des jours

        for(let i =0 ; i< tabJoursEnOrdre.length; i++) {
            joursDiv[i].innerText = tabJoursEnOrdre[i].slice(0,3);
        }


        //temp par jour

        for(let j =0 ; j<7; j++) {
            tempJoursDiv[j].innerText = `${Math.trunc(resultApi.daily[j+1].temp.day)}°`
        }


        //Icone dynamique

        if(heureActuelle >= 6 && heureActuelle < 20) {
            imgIcone.src = `ressources/jour/${resultApi.current.weather[0].icon}.svg`
        } else {
            imgIcone.src = `ressources/nuit/${resultApi.current.weather[0].icon}.svg`

        }

        chargementContainer.classList.add('disparition');

        
    })
}