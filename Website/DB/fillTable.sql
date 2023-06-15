#wir haben angefabgen eine seite dafür zu machen DataDump.html

INSERT INTO user(UserID, Name , Email, Passwort) VALUES (1,'Robin','hallo@hallo.de', 'sdalgkje4i45k3');
INSERT INTO user(UserID, Name , Email, Passwort) VALUES (2,'admin','hallo2@hallo.de', 'admin');
SELECT * from user;
SELECT * from test;
SELECT * FROM Künstler;
SELECT * FROM Veranstaltung;
SELECT * FROM Auftritt;


CREATE TABLE test(
    id integer PRIMARY KEY,
    img blob
);

DELETE from user WHERE UserID > 12;
DELETE FROM Veranstaltung WHERE VID = 8;
UPDATE Veranstaltung set endDate = NULL where VID = 5
SELECT * FROM Künstler where Name like '%%';

drop TABLE Auftritt;
DELETE FROM Auftritt WHERE AID = 2;
ALTER TABLE Auftritt ADD CONSTRAINT Auftritt_unique UNIQUE(Künstler, Veranstaltung);
SELECT v.VID, v.name, v.startDate FROM Veranstaltung v , Auftritt a WHERE v.Vid = a.Veranstaltung and a.Künstler = '1' ORDER BY v.startDate;
SELECT * from Preise WHERE Vid='1';
SELECT * FROM Preise WHERE Vid='2';