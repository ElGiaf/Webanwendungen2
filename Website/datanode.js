//https://www.youtube.com/watch?v=uOE1aqyzq_w

const express = require('express');
const http = require('http');
const fs = require('fs');
const multer  = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const { get } = require('https');
//const fileupload = require('express-fileupload');
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
//app.use(fileupload());

// Definiere eine Route für die Startseite
app.get('/data', (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'DataDump.html'));
  
});
app.get('/Festivals', (req, res) => {
  // Sende die HTML-Datei als Antwort auf die Anfrage
  res.sendFile(path.join(__dirname, 'public', 'Festivals.html'));
  
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


app.post("/upload/test", upload.fields([
  { name: "img", maxCount: 1 }
]), (req, res) => {
  const image = req.files["img"][0].filename;
  const query = "SELECT MAX(id) AS count FROM test";
    const id = getID(query);
  const sql = "INSERT INTO test (id, img) VALUES (?, ?)";
  const values = [id, image];

  db.run(sql, values, err => {
    if (err) {
      console.error(err);
      res.status(500).json({ valid: false, message: "Error inserting data into database" });
    } else {
      db.all('Select img from test where id = ?',[id],(err,rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          const img = row.img;
          console.log(img);
          res.status(200).json({ valid: true, message: "Data successfully inserted into database",img:img });
        });
      })
      
    }
  });
});

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
    const sql = "INSERT INTO Veranstaltung (VID,name, Logo, Bilder, startDate, endDate, InfoText) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [id,name, logo, bilder, start, ende, text];
  
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
    console.log('name: ',name ,von, bis);
      db.all('SELECT * FROM Veranstaltung where name like ? an startDate >= ? and endDate <= ?',['%'+name+'%',von, bis],(err,rows) => {
      if (err) {
        throw err;
      }
        res.status(200).json({ valid: true, rows: rows });
    });
  });
    // Bildinformationen in die SQLite-Datenbank schreiben
  
  
  // Server starten
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
