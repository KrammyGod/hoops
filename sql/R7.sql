/* GET PID, FIRST NAME and LASTNAME */
SELECT * FROM player where pid = 120;

/* GET ALL OTHER PLAYER STATS */
SELECT PS.assists, PS.points, PS.games, PS.season, PS.abbrev, T.tname 
FROM playerstats as PS, team as T
WHERE PS.pid = 120 and PS.abbrev = T.abbrev
ORDER BY PS.season DESC;

/* GET TEAM ABBREV and NAME */
SELECT * FROM team where abbrev LIKE '%NYA%';

/* GETTING ALL TEAM STATS */
SELECT TS.wins, TS.losses, TS.season
FROM teamstats as TS
WHERE TS.abbrev LIKE '%NYA%'
ORDER BY TS.season DESC;

/* GETTING AGGREGATE STATS FOR TEAM */
SELECT TS.abbrev, T.tname, ROUND(AVG(wins)) as wins, ROUND(AVG(losses)) as losses, COUNT(season)
FROM team as T, teamstats as TS
WHERE T.abbrev = TS.abbrev
GROUP BY TS.abbrev, T.tname
LIMIT 20;

/* GETTING AGGREGATE STATS FOR PLAYER */
SELECT P.pid, P.firstName, P.lastName, ROUND(SUM(assists)) as asts, ROUND(SUM(rebounds)) trbs, 
       ROUND(SUM(points)) pts, ROUND(SUM(games)) games, ROUND(COUNT(season)) as seasons
FROM player P, playerstats PS
WHERE PS.pid = P.pid
GROUP BY P.pid, P.firstName, P.lastName
LIMIT 20;