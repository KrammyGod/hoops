/* SEARCH FOR PLAYERS */
SELECT * FROM Player WHERE (firstName || ' ' || lastName) ILIKE ('%' || 'john W' || '%');

/* SEARCH FOR TEAMS */
SELECT * FROM Team WHERE tName ILIKE ('%' || 'ana' || '%');