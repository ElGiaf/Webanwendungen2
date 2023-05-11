window.addEventListener('DOMContentLoaded', init);

let userin;
let veranstaltungin;
let Künstlerin;
let Preisein;
let Auftrittin;
let url = "http://localhost:8080/upload/";

function init(){
    
    userin = document.getElementById('user');
    veranstaltungin = document.getElementById('Veranstaltung');
    Künstlerin = document.getElementById('Künstler');
    Preisein = document.getElementById('Preise');
    Auftrittin = document.getElementById('Auftritt');
    userin.addEventListener('submit',(event) => {user(event)});
    veranstaltungin.addEventListener('submit', (event) => {Veranstaltung(event)});
    Künstlerin.addEventListener('submit',(event) => {Künstler(event)});
    Preisein.addEventListener('submit',(event) => {Preise(event)});
    Auftrittin.addEventListener('submit',(event) => {Auftritt(event)});
}

/*function sendFetch(request){
    fetch(request)
        .then((response) => response.json())
        .then((data) => {
        console.log("Antwort vom Server:", data);
        if
        myForm.reset();
        })
        .catch((error) => {
        console.warn(error);
        });
}*/
async function makeRequest(request) {
    try {
      const response = await fetch(request);
      const data = await response.json();
  
      console.log('Antwort:', data);
      return data;
    } catch (error) {
      console.error('Fehler bei der Anfrage:', error);
    }
  }

  

function user(event){
    event.preventDefault();
    const formData = new FormData(userin)
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const passwort = formData.get('userPasswort');
    console.log(name,email,passwort);
    const data = [name,email,passwort]
    const request = new Request(url+'/user', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res == true){
        userin.reset();
    }
    else{
        document.getElementById('userEmail').style.backgroundColor = "red";
    }
}

function Veranstaltung(event){
    event.preventDefault();
    const formData = new FormData(veranstaltungin)
    const name = formData.get('VeranstaltungName');
    const logo = formData.get('VeranstaltungLogo');
    const Bilder = formData.get('VeranstaltungBilder');
    const start = formData.get('VeranstaltungStart');
    const ende = formData.get('VeranstaltungEnde');
    const text = formData.get('VeranstaltungText');
    console.log(name,logo, Bilder,start,ende,text);
    veranstaltungin.reset();
}

function Künstler(event){
    event.preventDefault();
    const formData = new FormData(Künstlerin)
    const name = formData.get('KünstlerName');
    const Bild = formData.get('KünstlerBild');
    const textKurz = formData.get('KünstlerKurzText');
    const bilder = formData.get('KünstlerBilder');
    const textLang = formData.get('KünstlerLangText');
    console.log(name,Bild,textKurz,bilder,textLang);
    Künstlerin.reset();
}

function Preise(event){
    event.preventDefault();
    const formData = new FormData(Preisein)
    const VeranstaltungID = formData.get('Vernasteltung');
    const klasse = formData.get('klasse');
    const preis = formData.get('preis');
    const anzahl = formData.get('anzahl');
    const vstart = formData.get('vstart');
    console.log(VeranstaltungID,klasse,preis,anzahl,vstart);
    Preisein.reset();
}
function Auftritt(event){
    event.preventDefault();
    const formData = new FormData(Auftrittin)
    const VeranstaltungID = formData.get('Vernasteltung');
    const KünstlerID = formData.get('Künstler');
    console.log(VeranstaltungID,KünstlerID);
    Preisein.reset();
}

function Merken(event){
    event.preventDefault();
    const formData = new FormData(Auftrittin)
    const VeranstaltungID = formData.get('Vernasteltung');
    const userID = formData.get('User');
    console.log(VeranstaltungID,userID);
    Preisein.reset();
}