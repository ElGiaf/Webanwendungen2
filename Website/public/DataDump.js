
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
    /*Preisein = document.getElementById('Preise');
    Auftrittin = document.getElementById('Auftritt');*/
    userin.addEventListener('submit',(event) => {user(event)});
    veranstaltungin.addEventListener('submit', (event) => {Veranstaltung(event)});
    Künstlerin.addEventListener('submit',(event) => {Künstler(event)});
    /*Preisein.addEventListener('submit',(event) => {Preise(event)});
    Auftrittin.addEventListener('submit',(event) => {Auftritt(event)});*/
}

  function makeRequest(request) {
    return new Promise((resolve, reject) => {
      try {
        fetch(request)
          .then(res => res.json())
          .then((json) => {
            let data = json.valid;
            console.log('Antwort:', data);
            resolve(json);
          });
      } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
        reject(error);
      }
    });
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
    makeRequest(request)
      .then(res => {
        if(res){
            document.getElementById('userEmail').style.backgroundColor = '';
            userin.reset();
        console.log('reset');
        }else{
            if(!res){
                document.getElementById('userEmail').style.backgroundColor = "red";
                console.log('email falsch');
            }else{
                console.log('fehler');
            }
        }
        
      })
      .catch(error => {
        console.log(error);
      });
  }

function Veranstaltung(event){
    event.preventDefault();
    const formData = new FormData()
    formData.append('name',document.getElementsByName('VName')[0].value);
    formData.append('logo',document.getElementsByName('VLogo')[0].files[0]);
    formData.append('Bilder',document.getElementsByName('VBilder')[0].files[0]);
    formData.append('start',document.getElementsByName('VStart')[0].value);
    formData.append('ende',document.getElementsByName('VEnde')[0].value);
    formData.append('text',document.getElementsByName('VText')[0].value);
    const request = new Request(url+'veranstaltung', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res){
            veranstaltungin.reset();
        console.log('reset');
        }else{
            console.log('fehler');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

function Künstler(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',document.getElementsByName('KünstlerName')[0].value);
    formData.append('bild',document.getElementsByName('KünstlerBild')[0].files[0]);
    formData.append('kText',document.getElementsByName('KünstlerKurzText')[0].value);
    formData.append('bilder',document.getElementsByName('KünstlerBilder')[0].files[0]);
    formData.append('lText',document.getElementsByName('KünstlerLangText')[0].value);
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res){
            Künstlerin.reset();
        console.log('reset');
        }else{
            console.log('fehler');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

function Preise(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('veranstaltung',document.getElementsByName('Vernasteltung')[0].value);
    formData.append('klasse',document.getElementsByName('klasse')[0].value);
    formData.append('preis',document.getElementsByName('preis')[0].value);
    formData.append('anzahl',document.getElementsByName('anzahl')[0].value);
    formData.append('vstart',document.getElementsByName('vstart')[0].value);
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res){
            userin.reset();
        console.log('reset');
        }else{
            console.log('fehler');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

function Auftritt(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('veranstaltung',document.getElementsByName('Vernasteltung')[0].value);
    formData.append('Kuenstler',document.getElementsByName('Künstler')[0].value);
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res){
            userin.reset();
        console.log('reset');
        }else{
            console.log('fehler');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

function Merken(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('veranstaltung',document.getElementsByName('Vernasteltung')[0].value);
    formData.append('veranstaltung',document.getElementsByName('User')[0].value);
    const request = new Request(url+'user', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res){
            userin.reset();
        console.log('reset');
        }else{
            console.log('fehler');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }