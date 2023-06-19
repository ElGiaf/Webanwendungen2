const express = require('express');
const http = require('http');
const fs = require('fs');
const multer  = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const { get } = require('https');

//Definierne der Datenbank
let db = new sqlite3.Database('./DB/data.db');
const app = express();
//Definieren des Ports
const port = 8080;

//Initalisierung von multer
const storage = multer.diskStorage({
    destination: "./public/Bilder/",
    filename: function (request, file, callback) {
      callback(null, Date.now() + "-" + file.originalname);
    },
  });

const upload = multer({ storage: storage });

//JSON responses
let reptrue = {valid:true};
let repfalse  = {valid:false}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//Get funktionen für die einzelnen Seiten
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});
// Hauptseite, Künstler und Einstellungen
app.get(['/','/Kuenstler','/Einstellungen'], (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'Main.html'));
});
// Veranstaltungsseite mit Datumseingrenzung
app.get(['/Festivals','/Konzerte'], (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'Veranstaltung.html'));
});
//Seite um Inhalte hochzuladen
app.get('/data', (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'DataDump.html'));
});
//Loginseite
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/Login.html'));
});
//Anzeigen einzlener Künstler oder Veranstaltungen
app.get(['/Konzerte/:id','/Festivals/:id','/:id','/Kuenstler/:id'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/Main.html'));
});

//Abfrage der höchsten id in einer Tabelle zur bestimmung der ID
function getID(query){
  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row) {
      let count = row.count;
      console.log('Anzahl der Einträge:', count);
      if(count == null){
        count = 0;
      }
      console.log('Anzahl der Einträge:', count);
      return count+1;
    } else {
      console.log('Keine Einträge gefunden.');
      return 1;
    }
  });
}

//Einfügen neuer Nutzer in die tabelle user
  app.post("/data/user", (request, response) => {
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

//Einfügen neuer Veranstaltungen in die tabelle Veranstaltungen
  app.post("/data/veranstaltung", upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "Bilder"}
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
        res.status(500).json(repfalse);
      } else {
        res.status(200).json(reptrue);
      }
    });
  });

//Einfügen neuer Künstler in die tabelle Künstler
  app.post("/data/Kuenstler", upload.fields([
    { name: "bild", maxCount: 1 },
    { name: "bilder"}
  ]), (req, res, next) => {
    console.log('in');
    const { name, kText, lText } = req.body;
    console.log(name,kText,lText);
    const logo = req.files["bild"][0].filename;
    const bilder = req.files["bilder"][0].filename;
    const query = "SELECT MAX(KID) AS count FROM Künstler";
    const id = getID(query);
    let sql;
    let values;
      sql = "INSERT INTO Künstler (KID, name, Bild, kurzText, bilderreihe, langText) VALUES (?, ?, ?, ?, ?, ?)";
      values = [id,name, logo, kText, bilder, lText];
    db.run(sql, values, err => {
      if (err) {
        console.error(err);
        res.status(500).json(repfalse);
      } else {
        res.status(200).json(reptrue);
      }
    });
  });

//Einfügen neuer Preise in die tabelle Preise
  app.post("/data/Preise", (request, response) => {
    console.log('preise eingegangen:',request.body);
    const veranstaltung = request.body.veranstaltung;
    const klasse = request.body.klasse;
    const preis = request.body.preis;
    const anzahl = request.body.anzahl;
    const vstart = request.body.vstart;
    const query = "SELECT MAX(Pid) AS count FROM Preise";
    console.log(veranstaltung,klasse,preis,anzahl,vstart);
    let id = getID(query);
          db.run('INSERT INTO Preise (Pid,Vid,klasse,Preis,anzahl,VStart) VALUES (?,?,?,?,?,?)',[id,veranstaltung,klasse,preis,anzahl,vstart], (err) => {
            if (err) {
              console.log('unique constraint');
              response.json(repfalse);
            } else {
              console.log('erfolg');
              response.json(reptrue);
            }
          }
        )}
  );

//Einfügen der verbindung von Veranstaltung und Künstler
  app.post("/data/Auftrit", (request, response) => {
    console.log(request.body);
    const veranstaltung = request.body.Veranstaltung;
    const Kuenstler = request.body.Kuenstler;
    const query = "SELECT MAX(AID) AS count FROM Auftritt";
    console.log(veranstaltung,Kuenstler);
    let id = getID(query);
          db.run('INSERT INTO Auftritt (AID,Künstler,Veranstaltung) VALUES (?,?,?)',[id,Kuenstler,veranstaltung], (err) => {
            if (err) {
              console.log('unique constraint');
              response.json(repfalse);
            } else {
              console.log('erfolg');
              response.json(reptrue);
            }
          }
        )}
  );

  //Ausgabe der veranstaltungen(mit enddatum) in einem bestimmten Zeitraum
  app.post('/Festivals/get', (req, res) => {
    // extract data from request body
    const name = req.body.name;
    const von = req.body.von;
    const bis = req.body.bis;
      db.all('SELECT * FROM Veranstaltung where name like ? and startDate >= ? and endDate <= ? and endDate is not null order by startDate',['%'+name+'%',von, bis],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows });
    });
  });
//Ausgabe der veranstaltungen(ohne enddatum) in einem bestimmten Zeitraum
  app.post('/Konzerte/get', (req, res) => {
    const name = req.body.name;
    const von = req.body.von;
    console.log('name: ',name ,von);
      db.all('SELECT * FROM Veranstaltung where name like ? and startDate >= ? and endDate is null order by startDate',['%'+name+'%',von],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows });
    });
  });
//Ausgabe aller zukünftigen veranstaltungen auf die Hauptseite
  app.post(['/',''],(req, res) => {
    const name = req.body.search;
      db.all('SELECT * FROM Veranstaltung where name like ? and startDate >= ? order by startDate',['%'+name+'%', Date.now()],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows, id:'main' });
    });
  });
//Ausgabe aller Veranstaltungen für die dateneingabe
  app.post(['/data/getVeranstaltung'],(req, res) => {
    const name = req.body.search;
      db.all('SELECT * FROM Veranstaltung where name like ? order by startDate',['%'+name+'%'],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows});
    });
  });
//Ausgabe aller Künstler (mit suchfunktion) 
  app.post(['/Kuenstler','/Kuenstler/','/data/getKuenstler'], (req, res) => {
    const name = req.body.search;
    console.log('name: ',name);
      db.all('SELECT * FROM Künstler where Name like ?',['%'+name+'%'],(err,rows) => {
      if (err) {
        throw err;
      }
        console.log(rows);
        res.status(200).json({ valid: true, rows: rows, id: 'Kuenstlerall' });
    });
  });
//Ausgabe einzelner veranstaltungen 
  app.post(['/Konzerte/:id','/Festivals/:id','/:id'], (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.all('SELECT * FROM Veranstaltung where VID = ?',id,(err,rows) => {
      if (err) {
        throw err;
      }db.all('SELECT k.KID,k.Name FROM Künstler k,Auftritt a where a.Veranstaltung = ? and a.Künstler = k.KID',id,(err,Krows) => {
        if (err) {
          throw err;
        }db.all('SELECT * FROM Preise where Vid = ? order by VStart',id,(err,Prows) => {
          if (err) {
            throw err;
          }console.log(Krows,Prows);
          res.status(200).json({ valid: true, rows: rows,Krows: Krows,Prows: Prows,id:'veranstaltung' });
        });
      });
    });
  });
//Ausgabe einzelner Künstler
  app.post(['/Kuenstler/:id'], (req, res) => {
    const id = req.params.id;
    console.log(id);
    let rows;
    let Arows;
    db.all('SELECT * FROM Künstler where KID = ?',id,(err,rows) => {
      if (err) {
        throw err;
      }
      db.all('SELECT v.VID, v.name, v.startDate FROM Veranstaltung v , Auftritt a WHERE v.Vid = a.Veranstaltung and a.Künstler = ? ORDER BY v.startDate;',id,(err,Arows) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ valid: true, rows: rows, Arows: Arows,id:'Kuenstler' });
    });
    });
  });


  
  // Server starten
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
