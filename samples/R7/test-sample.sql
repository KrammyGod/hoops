---------- R7: Sahl ----------
/* GET PLAYER STATS */
SELECT * FROM Player WHERE pid = 120;

SELECT assists, points, games, season, abbrev, tname 
FROM Player NATURAL JOIN PlayerStats NATURAL JOIN Team
WHERE pid = 120
ORDER BY season DESC;

/* GET TEAM STATS */
SELECT * FROM Team WHERE abbrev LIKE '%NYA%';

SELECT wins, losses, season
FROM TeamStats
WHERE abbrev LIKE '%NYA%'
ORDER BY season DESC;

/* GET TOTAL STATS FOR ALL PLAYERS */
SELECT pid, firstName || ' ' || lastName AS name,
       ROUND(SUM(assists)) AS asts,
       ROUND(SUM(rebounds)) AS trbs, 
       ROUND(SUM(points)) AS pts,
       ROUND(SUM(games)) AS games,
       ROUND(COUNT(season)) AS seasons
FROM Player NATURAL JOIN PlayerStats
GROUP BY pid, firstName, lastName
LIMIT 20;

/* GET TOTAL STATS FOR ALL TEAMS */
SELECT abbrev, tname,
       ROUND(AVG(wins)) AS wins,
       ROUND(AVG(losses)) AS losses,
       COUNT(season) AS seasons
FROM Team NATURAL JOIN TeamStats
GROUP BY abbrev, tname
LIMIT 20;
