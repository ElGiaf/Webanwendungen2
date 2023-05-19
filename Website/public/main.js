window.addEventListener('DOMContentLoaded', init);
let url;

function init(){
    url = window.location.href;
    getPage();
}

function getPage(){
    const data = {'valid': true}
    const request = new Request(url+'/get', {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
      }
    });
    makeRequest(request)
        .then(res => {
          if(res.id == 'veranstaltung'){
            const rows= res.rows;
            //const id = rows[0].VID;
            var name = rows[0].name;
            var logo = rows[0].Logo;
            var Bilder = rows[0].Bilder;
            var start = rows[0].startDate;
            var ende = rows[0].endDate;
            var text = rows[0].InfoText;
            console.log(name,logo,Bilder,start,ende,text);
            var container = document.getElementById('container');
            container.innerHTML = "<p><img src=\"Bilder/"+logo+"\" alt=\"\" class=\"Vlogo\"><h2>"+name+"</h2>"+start+", "+ende+" <br> <a href=\"javascript:history.back()\">zurück</a></p><img src=\"Bilder/"+Bilder+"\" alt=\"\" class=\"bilderreihe\"><button id=\"erinnerung\">Erinnerung erstellen</button><p class=\"vtext\">"+text+"</p>";
          }
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