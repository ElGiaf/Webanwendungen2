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
            const id = rows[0].VID;
            const name = rows[0].name;
            const logo = rows[0].Logo;
            const Bilder = rows[0].Bilder;
            const start = rows[0].startDate;
            const ende = rows[0].endDate;
            const text = rows[0].InfoText;
            var container = document.getElementById('container');
            container.innerHTML = "<p><img src=\""+logo+"\" alt=\"\" class=\"fest\"><h2>"+name+"</h2>"+start+", "+ende+" <br> <a href=\"javascript:history.back()\">zurück</a></p><img src=\""+Bilder+"\" alt=\"\" class=\"bilderreihe\"><button id=\"erinnerung\">Erinnerung erstellen</button><p>"+text+"</p>";
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