/* GET PID, FIRST NAME and LASTNAME */
SELECT * FROM Player WHERE pid = 120;

/* GET ALL OTHER PLAYER STATS */
SELECT assists, points, games, season, abbrev, tname 
FROM Player NATURAL JOIN PlayerStats NATURAL JOIN Team
WHERE pid = 120
ORDER BY season DESC;

/* GET TEAM ABBREV and NAME */
SELECT * FROM Team WHERE abbrev LIKE '%NYA%';

/* GETTING ALL TEAM STATS */
SELECT wins, losses, season
FROM TeamStats
WHERE abbrev LIKE '%NYA%'
ORDER BY season DESC;

/* GETTING AGGREGATE STATS FOR TEAM */
SELECT abbrev, tname,
       ROUND(AVG(wins)) AS wins,
       ROUND(AVG(losses)) AS losses,
       COUNT(season) AS seasons
FROM Team NATURAL JOIN TeamStats
GROUP BY abbrev, tname
ORDER BY abbrev;

/* GETTING AGGREGATE STATS FOR PLAYER */
SELECT pid, firstName || ' ' || lastName AS name,
       ROUND(SUM(assists)) AS asts,
       ROUND(SUM(rebounds)) AS trbs, 
       ROUND(SUM(points)) AS pts,
       ROUND(SUM(games)) AS games,
       ROUND(COUNT(season)) AS seasons
FROM Player NATURAL JOIN PlayerStats
GROUP BY pid, firstName, lastName
ORDER BY name;