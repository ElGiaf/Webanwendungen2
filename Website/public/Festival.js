//const { json } = require("body-parser");

window.addEventListener('DOMContentLoaded', init);
const url = 'http://localhost:8080/Festival/'

function init(){
    getFestival('Super',new Date(Date.now()),new Date(2050, 12, 30))
}

function getFestival(name,von,bis){
    //const data = {'name':name,'von':von,'bis':bis};
    const data = new FormData();
    data.append('name',name);
    data.append('name',name);
    data.append('name',name);
    console.log(data)
    const request = new Request(url+'get', {
        body: data,
        method: "POST",
    });
    const req = makeRequest(request);
    if(req.valid){
        req.rows.forEach((row) => {
            const name = row.name;
            const logo = row.Logo;
            const Bilder = row.Bilder;
            const start = row.startDate;
            const ende = row.endDate;
            const text = row.InfoText;
            console.log(name,logo,Bilder,start,ende,text);
        })
    }
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
