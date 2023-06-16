CREATE TABLE hUser (
	uid int not null PRIMARY KEY,
	hash varchar(256),
	email varchar(256),
	uName varchar(256),
	uRole varchar(20)
);

CREATE TABLE player (
	pid int not null PRIMARY KEY,
	firstName varchar(256),
	lastName varchar(256)
);

/* many to many relationship (should prob do one to many) */
CREATE TABLE bookmarks (
	uid int references hoopsUser,
	pid int references player,
	PRIMARY KEY (uid, pid)
);


CREATE TABLE team (
	abbrev varchar(5) not null PRIMARY KEY,
	tName varchar(256)
);

CREATE TABLE teamStats (
	abbrev varchar(5),
	wins int,
	losses int,
	FOREIGN KEY (abbrev) references team(abbrev)
);

CREATE TABLE playerStats (
	pid int,
	assists int, 
	rebounds int,
	points int,
	games int,
	season int,
	abbrev varchar(5),
	FOREIGN KEY (pid) references player(pid),
	FOREIGN KEY (abbrev) references team(abbrev)
);
