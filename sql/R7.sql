---------- R7: Sahl ----------
/* GET PLAYER STATS */
SELECT * FROM Player WHERE pid = 120;

SELECT assists, points, games, rebounds, season, abbrev, tname 
FROM PlayerStats NATURAL JOIN Team
WHERE pid = 120
ORDER BY season DESC, pid;

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
ORDER BY name
LIMIT 10
OFFSET 4 * 10;

/* GET TOTAL STATS FOR ALL TEAMS */
SELECT abbrev, tname,
       ROUND(AVG(wins)) AS wins,
       ROUND(AVG(losses)) AS losses,
       COUNT(season) AS seasons
FROM Team NATURAL JOIN TeamStats
GROUP BY abbrev, tname
ORDER BY abbrev
LIMIT 10
OFFSET 4 * 10;
