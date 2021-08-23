const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, options);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
// console.log(jourActuel);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel));
// console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;