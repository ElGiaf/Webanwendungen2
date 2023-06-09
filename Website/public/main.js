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
            container.innerHTML = "<p><img src=\"Bilder/"+logo+"\" alt=\"\" class=\"Vlogo\"></p><p><h2>"+name+"</h2>"+start+", "+ende+" <br> <a href=\"javascript:history.back()\">zurück</a></p><img src=\"Bilder/"+Bilder+"\" alt=\"\" class=\"bilderreihe\"><button id=\"erinnerung\">Erinnerung erstellen</button><p class=\"vtext\">"+text+"</p>";
          }
          if(res.id == 'main'){
            var container = document.getElementById('container');
            container.innerHTML='';
            //var js = document.getElementsByTagName('Head');
            //js.appendChild(document.createElement('<script src="logo.js"></script>'))
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
          if(res.id == 'Kuenstlerall'){
            var container = document.getElementById('container');
            container.innerHTML = '';
            res.rows.forEach((row) => {
              var id = row.KID;
              var name = row.Name;
              var bild = row.Bild;
              var kurzText = row.kurzText;
              var bilderreihe = row.bilderreihe;
              var langText = row.langText;
              var paragraph = document.createElement('details');
              paragraph.innerHTML = "<summary><h1>"+name+"</h1><img src=\"Bilder/"+bild+"\" alt=\"\"></summary><p>"+kurzText+"<br><a href=\""+url+"/"+id+"\"><button>Zum Künstler</button></a></p>";
              container.appendChild(paragraph);
            });
          }
          if(res.id == 'Kuenstler'){
            var container = document.getElementById('container');
            container.innerHTML = '';
            res.rows.forEach((row) => {
              var id = row.KID;
              var name = row.Name;
              var bild = row.Bild;
              var kurzText = row.kurzText;
              var bilderreihe = row.bilderreihe;
              var langText = row.langText;
              var paragraph = document.createElement('div');
              paragraph.innerHTML = "<img src=\"Bilder/"+bild+"\" alt=\"\" class=\"Vlogo\"><h2>"+name+"</h2><a href=\"javascript:history.back()\">zurück</a><button id=\"erinnerung\">Erinnerung erstellen</button><img src=\"Bilder/"+bilderreihe+"\" alt=\"\" class=\"bilderreihe\"><table id=\"Zeitraum\"><tr><th>Auftrit</th><th>Datum</th></tr></table><p class='Ktext'>"+langText+"</p>";
              container.appendChild(paragraph);
            });
            var Auftritte = document.getElementById('Zeitraum');
            res.Arows.forEach((row) => {
              const id = row.VID;
              const name = row.name;
              const start = row.startDate;
              console.log(id,name,start);
              var paragraph = document.createElement('tr');
              paragraph.innerHTML = "<td><a href=\"/"+id+"\">"+name+"</a></td><td>"+start+"</td>";
              Auftritte.appendChild(paragraph);
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