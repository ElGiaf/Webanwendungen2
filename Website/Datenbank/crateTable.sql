create TABLE user(
    UserID integer PRIMARY KEY,
    Name not NULL, 
    Email UNIQUE not NULL, 
    Passwort not NULL);

CREATE TABLE Veranstaltung(
    VID integer PRIMARY KEY,
    name TEXT not null, 
    Logo blob not NULL, 
    Bilder blob not NULL, 
    startDate text not null, 
    endDate text default NULL,
    InfoText text DEFAULT NULL);

Create TABLE Preise(
    Pid integer PRIMARY KEY,
    Vid REFERENCES veranstaltung(VID) not null,
    klasse text not null,
    Preis real not null,
    anzahl integer not null,
    VStart text not null);

CREATE TABLE Künstler(
    KID integer PRIMARY KEY,
    Name text UNIQUE not NULL,
    Bild blob not null,
    kurzText text not null,
    bilderreihe blob not null,
    langText text DEFAULT NULL);

CREATE TABLE Auftritt(
    AID integer PRIMARY KEY,
    Künstler REFERENCES Künstler(KID) not null,
    Veranstaltung REFERENCES Veranstaltung(VID) not null);