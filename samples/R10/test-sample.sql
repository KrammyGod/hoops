---------- R10: Saboor ----------
-- FILTER PLAYERS BY ONE OR MORE STATS --
SELECT * 
FROM Player 
NATURAL JOIN PlayerStats 
WHERE 
    (rebounds >= 500 OR 500 IS NULL) AND
    (assists >= NULL OR NULL IS NULL) AND
    (points >= 1000 OR 1000 IS NULL) AND
    (games >= 75 OR 75 IS NULL) AND
    (season = NULL OR NULL IS NULL)
LIMIT 10;

-- FILTER TEAMS BY ONE OR MORE STATS --
SELECT * 
FROM Team 
NATURAL JOIN TeamStats
WHERE 
    (wins >= 5 OR 5 IS NULL) AND
    (losses >= NULL OR NULL IS NULL) AND
    (season = 2000 OR 2000 IS NULL)
LIMIT 10;
