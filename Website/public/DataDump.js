
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

function makeRequest(request) {
    try {
        fetch(request)
            .then(res => res.json())
            .then((json) => {
                let data= json.valid;
                console.log('Antwort:', data);
                return data;
        });
      
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
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        userin.reset();
        console.log('reset')
    }
    if(!res){
        document.getElementById('userEmail').style.backgroundColor = "red";
        console.log('email falsch');
    }
}

/*function Veranstaltung(event){
    event.preventDefault();
    const formData = new FormData()
    formData.append('name',document.getElementsByName('VName').value);
    formData.append('logo',document.getElementsByName('VLogo').file);
    formData.append('Bilder',document.getElementsByName('VBilder').files);
    formData.append('start',document.getElementsByName('VStart').value);
    formData.append('ende',document.getElementsByName('VEnde').value);
    formData.append('text',document.getElementsByName('VText').value);
    console.log(formData);
    //const data = [name,logo, Bilder,start,ende,text]
    const request = new Request(url+'veranstaltung', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        veranstaltungin.reset();
    }
    
}
*/
function Veranstaltung(event){
    event.preventDefault();
    const formData = new FormData()
    formData.append('name',document.getElementsByName('VName')[0].value);
    formData.append('logo',document.getElementsByName('VLogo')[0].files[0]);
    formData.append('Bilder',document.getElementsByName('VBilder')[0].files[0]);
    formData.append('start',document.getElementsByName('VStart')[0].value);
    formData.append('ende',document.getElementsByName('VEnde')[0].value);
    formData.append('text',document.getElementsByName('VText')[0].value);
    const name= formData.get('name');
    const logo= formData.get('logo');
    const Bilder= formData.get('Bilder');
    const start= formData.get('start');
    const ende= formData.get('ende');
    const text= formData.get('text');
    console.log(formData, name,logo,Bilder,start,ende,text);
    const request = new Request(url+'veranstaltung', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        veranstaltungin.reset();
    }
    
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
    //const data = [name,Bild,textKurz,bilder,textLang]
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        Künstlerin.reset();
    }
    if(!res){
        document.getElementById('KünstlerName').style.backgroundColor = "red";
        console.log('Name bereits vorhanden');
    }
    
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
    //const data = [VeranstaltungID,klasse,preis,anzahl,vstart]
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        Preisein.reset();
    }
    
}
function Auftritt(event){
    event.preventDefault();
    const formData = new FormData(Auftrittin)
    const VeranstaltungID = formData.get('Vernasteltung');
    const KünstlerID = formData.get('Künstler');
    console.log(VeranstaltungID,KünstlerID);
    //const data = [VeranstaltungID,KünstlerID]
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        Preisein.reset();
    }
    
}

function Merken(event){
    event.preventDefault();
    const formData = new FormData(Auftrittin)
    const VeranstaltungID = formData.get('Vernasteltung');
    const userID = formData.get('User');
    console.log(VeranstaltungID,userID);
    //const data = [VeranstaltungID,userID]
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    const res = makeRequest(request);
    if(res){
        Preisein.reset();
    }
   
}