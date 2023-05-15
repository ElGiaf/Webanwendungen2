//https://www.youtube.com/watch?v=uOE1aqyzq_w

const express = require('express');
const http = require('http');
const fs = require('fs');
const multer  = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

let db = new sqlite3.Database('./DB/data.db');
const app = express();
const appServer = express();
const port = 8080;
const storage = multer.diskStorage({
    destination: "./public/Bilder/",
    filename: function (request, file, callback) {
      callback(null, Date.now() + "-" + file.originalname);
    },
  });
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definiere eine Route für die Startseite
app.get('/data', (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'DataDump.html'));
});
  
function getID(query){
  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row) {
      const count = row.count;
      console.log('Anzahl der Einträge:', count);
      return count+1;
    } else {
      console.log('Keine Einträge gefunden.');
      return 1;
    }
  });
}
  
  
  
  app.post("/upload/user", upload.single("User"), (request, response) => {
    console.log(request.body);
    const name = request.body.userName;
    const email = request.body.userEmail;
    const passwort = request.body.userPasswort;
    const query = "SELECT COUNT(*) AS count FROM user";
    const id = getID(query);
    console.log(id,name,email,passwort);
          db.run('INSERT INTO user (UserID,Name,Email,Passwort) VALUES (?,?,?,?)',[id,name,email,passwort], (err) => {
            if (err) {
              console.log('unique constraint');
              response.json({valid: false});
            } else {
              response.json({valid: true});
            }
          }
        )}
  );
  app.post("/upload/veranstaltung", upload.array("Veranstaltung"), (request, response) => {
    console.log(request.body);
    const name = request.body.VeranstaltungName;
    const logo = request.body.VeranstaltungLogo;
    const Bilder = request.body.VeranstaltungBilder;
    const start = request.body.VeranstaltungStart;
    const ende = request.body.VeranstaltungEnde;
    const text = request.body.VeranstaltungText;
    console.log(name,logo, Bilder,start,ende,text);
    const query = "SELECT COUNT(*) AS count FROM Veranstaltung";
    const id = getID(query);
    console.log(id,name,email,passwort);
      db.run('INSERT INTO Veranstaltung (VID, name, Logo, Bilder, startDate, endDate, InfoText) VALUES (?,?,?,?,?,?,?)',[id,name,logo, Bilder,start,ende,text], (err) => {
        if (err) {
          console.log('unique constraint');
          response.json({valid: false});
        } else {
          response.json({valid: true});
        }
      }
    )}
  );

  
    // Bildinformationen in die SQLite-Datenbank schreiben
    
  
  // Server starten
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });