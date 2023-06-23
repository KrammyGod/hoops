/* SEARCH FOR PLAYERS */
SELECT * FROM Player WHERE (firstName || ' ' || lastName) ILIKE ('%' || 'John W' || '%');

/* SEARCH FOR TEAMS */
SELECT * FROM Team WHERE tName ILIKE ('%' || 'ana' || '%');