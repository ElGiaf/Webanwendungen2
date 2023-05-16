#wir haben angefabgen eine seite dafür zu machen DataDump.html

INSERT INTO user(UserID, Name , Email, Passwort) VALUES (1,'Robin','hallo@hallo.de', 'sdalgkje4i45k3');
INSERT INTO user(UserID, Name , Email, Passwort) VALUES (2,'admin','hallo2@hallo.de', 'admin');
SELECT * from user;
SELECT * from test;


CREATE TABLE test(
    id integer PRIMARY KEY,
    img blob
);

DELETE from user WHERE UserID > 12;