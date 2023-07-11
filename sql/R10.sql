-- FILTER PLAYERS BY ONE OR MORE STATS --
SELECT 
    pid AS id, 
    (firstName || ' ' || lastName) AS name,
    games, points, assists, rebounds, season
FROM Player 
NATURAL JOIN PlayerStats 
WHERE 
    (rebounds >= $1 OR $1 IS NULL) AND
    (assists >= $2 OR $2 IS NULL) AND
    (points >= $3 OR $3 IS NULL) AND
    (games >= $4 OR $4 IS NULL) AND
    (season = $5 OR $5 IS NULL)
ORDER BY name ASC, season DESC
LIMIT 10
OFFSET 0 * 10;

-- FILTER TEAMS BY ONE OR MORE STATS --
SELECT 
    abbrev AS id, 
    tname AS name, 
    wins, losses, season
FROM Team 
NATURAL JOIN TeamStats
WHERE 
    (wins >= $1 OR $1 IS NULL) AND
    (losses >= $2 OR $2 IS NULL) AND
    (season = $3 OR $3 IS NULL)
ORDER BY name ASC, season DESC
LIMIT 10
OFFSET 0 * 10;
