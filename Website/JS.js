/*function init(){
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      //document.getElementsByTagName('HEADER').classList.add("minimized");
      document.getElementById('head').classList.add("minimized");
    } else {
      //document.getElementsByTagName('HEADER').classList.remove("minimized");
      document.getElementById('head').classList.remove("minimized");
    }
  });
}
http.createServer(function (req, res) {
  fs.readFile('main.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);*/
//Require in some of the native stuff that comes with Node

const express = require('express');
const http = require('http');
const fs = require('fs');
const multer  = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,)));

// Definiere eine Route für die Startseite
app.get('/', (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname,'Main.html'));
  
});

  /* SQLite-Datenbank öffnen
  let db = new sqlite3.Database('DB/data.db');
  
  // Route zum Hochladen des Bilds
  app.post('/upload/user', (req, res) => {
    // Informationen über das hochgeladene Bild erhalten
    /*const name = req.body.userName;
    const email = req.body.userEmail;
    const passwort = req.body.userPasswort;*/
    //console.log(req.body);
    /*// Bildinformationen in die SQLite-Datenbank schreiben
    db.run('INSERT INTO user (Name,Email,Passwort) VALUES ('+name+','+email+','+passwort+')'), (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }}); */
  
  // Server starten
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
