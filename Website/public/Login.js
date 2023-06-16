
window.addEventListener('DOMContentLoaded', init);
let url;

function init(){
    url = window.location.href;
    const cookie = require('cookie');
    const express = require('express');
    const http = require('http');
    const fs = require('fs');
    const multer  = require('multer');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const bodyParser = require('body-parser');
    const { get } = require('https');

    const app = express();

    let db = new sqlite3.Database('../DB/data.db');
    app.use(cookieParser());
    const cookieParser = require('cookie-parser');
    anmeldenoption();
}

function login(email, pw){
  const query = 'SELECT Email, Passwort FROM users WHERE id = ?';
  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (row.Email == email) {
      if(row.Passwort ==pw){
         // Login erfolgreich
        return res.json({ message: 'Erfolgreich angemeldet' });
        alert("angemeldet");
      }else {
        return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
        alert("Fehler bei der eingabe");
      }
    }
  });
}

app.post('/login', (req, res) => {
  // Hier werden die Anmeldedaten überprüft
  //const { email, password } = req.body

  const query = 'SELECT Email, Passwort FROM users WHERE id = ?';
  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (row.Email == email) {
      if(row.Passwort ==pw){
         // Login erfolgreich
         res.cookie('lastLogin', { email, password }, { maxAge: 900000, httpOnly: true });
         // Weiterleitung zur Hauptseite oder anderen Aktionen...

      }else {
        return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
        alert("Fehler bei der eingabe");
      }
    }
  });
});

/* Hauptseite
app.get('/', (req, res) => {
  // Überprüfen, ob ein Cookie mit den Anmeldedaten vorhanden ist
  const lastLogin = req.cookies.lastLogin;
  
  if (lastLogin) {
    // Wenn ein Cookie vorhanden ist, die Anmeldedaten auslesen und verwenden
    const { email, password } = lastLogin;
    // Weitere Verarbeitung der Anmeldedaten...
  }

  // Weiteres Rendern der Hauptseite...
});*/



    


function anmeldenoption(){
    var container = document.getElementById('container');
    container.innerHTML = '<section class="input"><button>Anmelden</button><button>Registrieren</button></section>';
}
