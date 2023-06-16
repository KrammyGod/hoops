CREATE TABLE hUser (
	uid SERIAL PRIMARY KEY,
	hash text,
	email text,
	uName text,
	uRole varchar(20)
);

CREATE TABLE player (
	pid SERIAL PRIMARY KEY,
	firstName text,
	lastName text
);

/* many to many relationship (should prob do one to many) */
CREATE TABLE bookmarks (
	uid int REFERENCES hoopsUser,
	pid int REFERENCES player,
	PRIMARY KEY (uid, pid)
);


CREATE TABLE team (
	abbrev varchar(5) NOT NULL PRIMARY KEY,
	tName text
);

CREATE TABLE teamStats (
	abbrev varchar(5) NOT NULL,
	wins int,
	losses int,
	FOREIGN KEY (abbrev) REFERENCES team(abbrev)
);

CREATE TABLE playerStats (
	pid int NOT NULL,
	assists int, 
	rebounds int,
	points int,
	games int,
	season int,
	abbrev varchar(5) NOT NULL,
	FOREIGN KEY (pid) REFERENCES player(pid),
	FOREIGN KEY (abbrev) REFERENCES team(abbrev)
);
