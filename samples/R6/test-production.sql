---------- R6: Sahij ----------
/* SEARCH FOR PLAYERS */
SELECT * FROM Player
WHERE (firstName || ' ' || lastName) ILIKE ('%' || 'john W' || '%') 
LIMIT 10 OFFSET 0 * 10;

/* SEARCH FOR TEAMS */
SELECT * FROM Team 
WHERE tName ILIKE ('%' || 'ana' || '%') 
LIMIT 10 OFFSET 0 * 10;
