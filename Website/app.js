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

let reptrue = {valid:true};
let repfalse  = {valid:false}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Definiere Route für Seiten
app.get(['/','/Kuenstler','/Konto','/Einstellungen'], (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'Main.html'));
});
app.get(['/Festivals','/Konzerte'], (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'Veranstaltung.html'));
});
app.get('/data', (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'DataDump.html'));
});
app.get(['/Konzerte/:id','/Festivals/:id'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/Main.html'));
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


/*db.all("SELECT UserID,Name,Email FROM user WHERE UserID=1 ", [], (err, rows) => {
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
*/
 

  
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


  app.post("/upload/veranstaltung", upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "Bilder", maxCount: 1 }
  ]), (req, res, next) => {
    const { name, start, ende, text } = req.body;
    console.log(name,start,ende,text);
    const logo = req.files["logo"][0].filename;
    const bilder = req.files["Bilder"][0].filename;
    const query = "SELECT MAX(VID) AS count FROM Veranstaltung";
    const id = getID(query);
    let sql;
    let values;
    if(ende == ''){
      sql = "INSERT INTO Veranstaltung (VID,name, Logo, Bilder, startDate, InfoText) VALUES (?, ?, ?, ?, ?, ?)";
      values = [id,name, logo, bilder, start, text];
    }else{
      sql = "INSERT INTO Veranstaltung (VID,name, Logo, Bilder, startDate, endDate, InfoText) VALUES (?, ?, ?, ?, ?, ?, ?)";
      values = [id,name, logo, bilder, start, ende, text];
    }
    db.run(sql, values, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error inserting data into database" });
      } else {
        res.status(200).json({ success: true, message: "Data successfully inserted into database" });
      }
    });
  });
  
  app.post('/Festivals/get', (req, res) => {
    // extract data from request body
    const name = req.body.name;
    const von = req.body.von;
    const bis = req.body.bis;
      db.all('SELECT * FROM Veranstaltung where name like ? and startDate >= ? and endDate <= ? and endDate is not null',['%'+name+'%',von, bis],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows });
    });
  });

  app.post('/Konzerte/get', (req, res) => {
    // extract data from request body
    const name = req.body.name;
    const von = req.body.von;
    console.log('name: ',name ,von);
      db.all('SELECT * FROM Veranstaltung where name like ? and startDate >= ? and endDate is null',['%'+name+'%',von],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows });
    });
  });

  app.post(['/Konzerte/:id/get','/Festivals/:id/get'], (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.all('SELECT * FROM Veranstaltung where VID = ?',id,(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows,id:'veranstaltung' });
    });
  });
  
  // Server starten
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
