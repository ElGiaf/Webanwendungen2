window.addEventListener('DOMContentLoaded', init);
let url;

function init(){
    url = window.location.href;
    getPage();
}

function getPage(){
    const request = new Request(url+'/get', {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
      }
    });
    makeRequest(request)
        .then(res => {})
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