window.addEventListener('DOMContentLoaded', init);
let url;

function init(){
    url = window.location.href;
    const suche=document.getElementById('suche');
    suche.addEventListener('input',()=>{getPage()});
    getPage();
}

function getPage(){
    const suche = document.getElementById('suche').value;
    console.log(suche);
    const data = {'valid': true, 'search': suche}
    const request = new Request(url, {
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
          if(res.id == 'main'){
            var container = document.getElementById('container');
            container.innerHTML='';
            res.rows.forEach((row) => {
              const id = row.VID;
              const name = row.name;
              const logo = row.Logo;
              const Bilder = row.Bilder;
              const start = row.startDate;
              let ende = row.endDate;
              const text = row.InfoText;
              if(ende== null){
                ende = '';
              }else{
                ende = ', '+ende
              }
              console.log('hallowelt',id,name,start,ende);
              var paragraph = document.createElement('dl');
              paragraph.innerHTML = "<dt><a href=\""+url+id+"\"><img src=\"Bilder/"+logo+"\" alt=\"\" class=\"Vlogo\"></a></dt><dd><h3>"+name+"</h3><h4>"+start+ende+"</h4></dd>";
              container.appendChild(paragraph);
            });
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