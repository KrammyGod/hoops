---------- R7: Sahl ----------
SELECT 'R7: Sahl' AS FEATURE;
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
GROUP BY abbrev, tname;

/* GETTING AGGREGATE STATS FOR PLAYER */
SELECT pid, firstName || ' ' || lastName AS name,
       ROUND(SUM(assists)) AS asts,
       ROUND(SUM(rebounds)) AS trbs, 
       ROUND(SUM(points)) AS pts,
       ROUND(SUM(games)) AS games,
       ROUND(COUNT(season)) AS seasons
FROM Player NATURAL JOIN PlayerStats
GROUP BY pid, firstName, lastName;

---------- R8: Saboor ----------
SELECT 'R8: Saboor' AS FEATURE;
/* INSERT NEW USER */
INSERT INTO HUser (hash, email, uName, uRole)
VALUES ('f222f', 'john@example.com', 'John', 'admin');

/* GET USER INFO */
SELECT * FROM HUser WHERE uid = 1;

/* UPDATE USER INFO */
UPDATE HUser
SET uName = 'Brad', email = 'brad@gmail.com', hash = 'f555f'
WHERE uid = 1;

/* VERIFY LOGIN */
SELECT * FROM HUser
WHERE email = 'brad@gmail.com' and hash = 'f555f';

/* DELETE USER */
/* BOOKMARKS DELETED USING ON DELETE CASCADE */
DELETE FROM HUser WHERE uid = 1;
