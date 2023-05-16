//https://www.youtube.com/watch?v=uOE1aqyzq_w

const express = require('express');
const http = require('http');
const fs = require('fs');
const multer  = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const { get } = require('https');

let db = new sqlite3.Database('./DB/data.db');
const app = express();
const port = 8080;
const storage = multer.diskStorage({
    destination: "./public/Bilder/",
    filename: function (request, file, callback) {
      callback(null, Date.now() + "-" + file.originalname);
    },
  });
const upload = multer({ storage: storage });

  const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };


let reptrue = {valid:true};
let repfalse  = {valid:false}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());

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

db.all("SELECT UserID,Name,Email FROM user WHERE UserID=1 ", [], (err, rows) => {
  if (err) {
    console.log("error");
  }
  rows.forEach((row) => {
    var a=row.UserID+row.Name+row.Email;
    console.log(a +"neuuuu");
    process.getElementById("DBTest").innerText=a;
  });
});  

//Standard abfrage für die datenbank mit ausgabe auf der Konsole (SQL befehl wie gelernt eintragen)
db.all("SELECT UserID,Name,Email FROM user WHERE UserID=13", [], (err, rows) => {
  if (err) {
    console.log("error");
  }
  rows.forEach((row) => { 
    console.log(row.Name,row.Email);
  }
  );
});

 

  
  app.post("/upload/user", (request, response) => {
    console.log(request.body);
    const name = request.body.userName;
    const email = request.body.userEmail;
    const passwort = request.body.userPasswort;
    const query = "SELECT MAX(UserID) AS count FROM user";
    const id = getID(query);
    console.log(id,name,email,passwort);
          db.run('INSERT INTO user (UserID,Name,Email,Passwort) VALUES (?,?,?,?)',[id,name,email,passwort], (err) => {
            if (err) {
              console.log('unique constraint');
              response.json(repfalse);
            } else {
              response.json(reptrue);
            }
          }
        )}
  );
 /*app.post("/upload/veranstaltung", upload.array("Veranstaltung"), (request, response) => {
    console.log(request.body,request.files);
    const name = request.body.name;
    const logo = request.files.logo;
    const Bilder = request.files.Bilder;
    const start = request.body.start;
    const ende = request.body.ende;
    const text = request.body.text;
    console.log(name,logo, Bilder,start,ende,text);
    const query = "SELECT MAX(VID) AS count FROM Veranstaltung";
    const id = getID(query);
    console.log(id,name,email,passwort);
      db.run('INSERT INTO Veranstaltung (VID, name, Logo, Bilder, startDate, endDate, InfoText) VALUES (?,?,?,?,?,?,?)',[id,name,logo, Bilder,start,ende,text], (err) => {
        if (err) {
          console.log('unique constraint');
          response.json(repfalse);
        } else {
          response.json(reptrue);
        }
      }
    )}
  );*/
  app.post("/upload/veranstaltung", upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "Bilder", maxCount: 1 }
  ]), (req, res, next) => {
    const { name, start, ende, text } = req.body;
    console.log(name,start,ende,text);
    const logo = req.files["logo"][0].filename;
    const bilder = req.files["Bilder"][0].filename;
  
    const sql = "INSERT INTO Veranstaltung (name, Logo, Bilder, startDate, endDate, InfoText) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, logo, bilder, start, ende, text];
  
    db.run(sql, values, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error inserting data into database" });
      } else {
        res.status(200).json({ success: true, message: "Data successfully inserted into database" });
      }
    });
  });
  
    // Bildinformationen in die SQLite-Datenbank schreiben
    
  
  // Server starten
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });