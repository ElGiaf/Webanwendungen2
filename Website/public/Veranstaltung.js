
window.addEventListener('DOMContentLoaded', init);
let url;

function init(){
    url = window.location.href;
    const von=document.getElementById('von');
    von.addEventListener('input',()=>{searchV()});
    const bis=document.getElementById('bis');
    bis.addEventListener('input',()=>{searchV()});
    const suche=document.getElementById('suche');
    suche.addEventListener('input',()=>{searchV()});
    getVeranstaltung('',new Date(Date.now()),new Date(3000, 12, 30))
}
function searchV(){
  let von=document.getElementById('von').value;
  if(von==""){
    von=Date.now();
  }
  let bis=document.getElementById('bis').value;
  console.log(bis);
  if(bis==""){
    bis= new Date(3000, 12, 30);
  }
  let name=document.getElementById('suche').value;
  console.log(name,von,bis);
  document.getElementById('container').innerHTML="";
  getVeranstaltung(name,von,bis);
}
function getVeranstaltung(name, von, bis) {
  const data = {'name':name,'von':von,'bis':bis};
  console.log(data.name);
  const request = new Request(url+'/get', {
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
            const id = row.VID;
            const name = row.name;
            const logo = row.Logo;
            const Bilder = row.Bilder;
            const start = row.startDate;
            const ende = row.endDate;
            const text = row.InfoText;
            console.log(id,name,start,ende);
            var container = document.getElementById('container');
            var paragraph = document.createElement('dl');
            paragraph.innerHTML = "<dt><a href=\""+url+"/"+id+"\"><img src=\"Bilder/"+logo+"\" alt=\"\" class=\"festivals\"></a></dt><dd><h3>"+name+"</h3><h4>"+start+", "+ende+"</h4><p>"+text+"</p></dd>";
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
