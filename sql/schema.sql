-- Enum for types of user roles
CREATE TYPE roleType AS ENUM ('admin', 'user');

CREATE TABLE HUser (
	uid SERIAL PRIMARY KEY,
	hash text,
	email text,
	uName text,
	uRole roleType
);

CREATE TABLE Player (
	pid SERIAL PRIMARY KEY,
	firstName text,
	lastName text
);

CREATE TABLE Bookmarks (
	uid int REFERENCES HUser ON DELETE CASCADE,
	pid int REFERENCES Player,
	PRIMARY KEY (uid, pid)
);

CREATE TABLE Team (
	abbrev varchar(5) NOT NULL PRIMARY KEY,
	tName text
);

CREATE TABLE TeamStats (
	abbrev varchar(5) NOT NULL REFERENCES Team,
	wins int,
	losses int,
	season int NOT NULL,
	PRIMARY KEY (abbrev, season)
);

CREATE TABLE PlayerStats (
	pid int NOT NULL REFERENCES Player,
	assists int, 
	rebounds int,
	points int,
	games int,
	season int NOT NULL,
	abbrev varchar(5) NOT NULL REFERENCES Team,
	PRIMARY KEY (pid, season, abbrev)
);
