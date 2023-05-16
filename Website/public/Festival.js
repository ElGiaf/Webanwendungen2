//const { json } = require("body-parser");

window.addEventListener('DOMContentLoaded', init);
const url = 'http://localhost:8080/Festivals/'

function init(){
    getFestival('',new Date(Date.now()),new Date(2050, 12, 30))
}

/*function getFestival(name,von,bis){
    const data = JSON.stringify({'name':name,'von':von,'bis':bis});
    /*const data = new FormData();
    data.append('name',name);
    data.append('von',von);
    data.append('bis',bis);*/
  /*  console.log(data.name)
    const request = new Request(url+'get', {
        body: data,
        method: "POST",
    });         
    const res = makeRequest(request);
    if(res.valid){
        res.rows.forEach((row) => {
            const name = row.name;
            const logo = row.Logo;
            const Bilder = row.Bilder;
            const start = row.startDate;
            const ende = row.endDate;
            const text = row.InfoText;
            console.log(name,logo,Bilder,start,ende,text);
        })
    }
}*/

function getFestival(name, von, bis) {
  const data = {'name':name,'von':von,'bis':bis};
  console.log(data.name);
  const request = new Request(url+'get', {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    }
  });
  makeRequest(request)
      .then(res => {
        console.log(res);
        if(res.valid){
          res.rows.forEach((row) => {
            const name = row.name;
            const logo = row.Logo;
            const Bilder = row.Bilder;
            const start = row.startDate;
            const ende = row.endDate;
            const text = row.InfoText;
            var container = document.getElementById('container');
            var paragraph = document.createElement('dl');
            paragraph.innerHTML = "<dt><a><img src=\"Bilder/"+logo+"\" alt=\"\" class=\"festivals\"></a></dt><dd><h3>"+name+"</h3><p>"+text+"</p></dd>";
            container.appendChild(paragraph);
          });
        }else{
            if(!res){
                console.log('fehler valid false');
            }else{
                console.log('fehler');
            }
        }
        
      })
      .catch(error => {
        console.log(error);
      });         
}

function makeRequest(request) {
    return new Promise((resolve, reject) => {
      try {
        fetch(request)
          .then(res => res.json())
          .then((json) => {
            let data = json.valid;
            console.log('Antwort:', data, json.rows);
            resolve(json);
          });
      } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
        reject(error);
      }
    });
  }
