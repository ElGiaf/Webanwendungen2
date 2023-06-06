
window.addEventListener('DOMContentLoaded', init);
let userin;
let veranstaltungin;
let Künstlerin;
let Preisein;
let Auftrittin;
let sucheKuenstler;
let sucheVeranastaltung;
let url;


function init(){
    url = window.location.href;
    userin = document.getElementById('user');
    veranstaltungin = document.getElementById('Veranstaltung');
    Künstlerin = document.getElementById('Künstler');
    /*Preisein = document.getElementById('Preise');*/
    Auftrittin = document.getElementById('Auftritt');
    sucheKuenstler = document.getElementById('sucheAuftritK');
    sucheVeranastaltung= document.getElementById('sucheAuftritV');
    userin.addEventListener('submit',(event) => {user(event)});
    veranstaltungin.addEventListener('submit', (event) => {Veranstaltung(event)});
    Künstlerin.addEventListener('submit',(event) => {Künstler(event)});
    /*Preisein.addEventListener('submit',(event) => {Preise(event)});*/
    Auftrittin.addEventListener('submit',(event) => {Auftritt(event)});
    sucheKuenstler.addEventListener('input',(event)=>{sucheKuenstlerFunk(event)});
    sucheVeranastaltung.addEventListener('input',(event)=>{sucheVeranastaltungFunk(event)});
    sucheKuenstlerFunk();
    sucheVeranastaltungFunk();
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
    const request = new Request(url+'/user', {
      body: formData,
      method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res.valid){
            document.getElementById('userEmail').style.backgroundColor = '';
            userin.reset();
        console.log('reset');
        }else{
            if(!res.valid){
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
    const request = new Request(url+'/veranstaltung', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res.valid){
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
    formData.append('name',document.getElementsByName('KName')[0].value);
    formData.append('bild',document.getElementsByName('KBild')[0].files[0]);
    formData.append('kText',document.getElementsByName('KKText')[0].value);
    formData.append('bilder',document.getElementsByName('KBilder')[0].files[0]);
    formData.append('lText',document.getElementsByName('KLText')[0].value);
    console.log(formData.name,formData.bild,formData.kText,formData.lText);
    const request = new Request(url+'/Kuenstler', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res.valid){
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
    const request = new Request(url+'Preise', {
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
    formData.append('Veranstaltung',document.getElementById('AuftritVeranstaltung').value);
    formData.append('Kuenstler',document.getElementById('AuftritKuenstler').value);
    const request = new Request(url+'/Auftrit', {
        body: formData,
        method: "POST",
    });
    makeRequest(request)
      .then(res => {
        if(res){
            userin.reset();
        console.log('reset');
        }else{
            console.log('existiert bereits');
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
    const request = new Request(url+'/Merken', {
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

  function sucheKuenstlerFunk(event){
    const suche = document.getElementById('AuftritKuenstler');
    suche.innerHTML = '';
    let name = sucheKuenstler.value;
    const data = {'valid': true, 'search': name};
    console.log(name);
    const request = new Request(url+'/getKuenstler',{
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    });
    makeRequest(request)
      .then(res =>{
        console.log(res.rows);
        if (res.valid) {
          res.rows.forEach(row => {
            const id = row.KID;
            const name = row.Name;
            console.log(id, name);
            const paragraph = document.createElement('option');
            paragraph.value = id;
            paragraph.label = name;
          //paragraph.innerHTML('<p name=\''+id+'\'>'+name+'</p>');
            suche.appendChild(paragraph);
          });
        }
      })
    }
    
    function sucheVeranastaltungFunk(event){
    const suche = document.getElementById('AuftritVeranstaltung');
    suche.innerHTML = '';
    let name = sucheVeranastaltung.value;
    const data = {'valid': true, 'search': name};
    console.log(name);
    const request = new Request(url+'/getVeranstaltung',{
      body: JSON.stringify(data),
       method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    });
    makeRequest(request)
      .then(res =>{
        console.log(res.rows);
        if (res.valid) {
          res.rows.forEach(row => {
            var id = row.VID;
            var Name = row.name;
            var start = row.startDate;
            const paragraph = document.createElement('option');
            paragraph.value = id;
            paragraph.label ='['+ start+ '] '+ Name;
          //paragraph.innerHTML('<p name=\''+id+'\'>'+name+'</p>');
            suche.appendChild(paragraph);
            console.log(Name);
          });
        }
      })
    }