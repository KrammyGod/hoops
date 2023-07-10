---------- R11: Mark ----------
-- Sort by average points per game per player
SELECT * FROM Player NATURAL JOIN (
    SELECT pid, SUM(points) / SUM(games) AS ppg
    FROM PlayerStats
    GROUP BY pid
) A
ORDER BY ppg DESC
LIMIT 10;

-- Sort by total wins per team
SELECT * FROM Team NATURAL JOIN (
    SELECT abbrev, SUM(wins) AS totWins
    FROM TeamStats GROUP BY abbrev
) A
ORDER BY totWins DESC
LIMIT 10;

-- Sort by percentage of games won per team
SELECT * FROM Team NATURAL JOIN (
    SELECT abbrev,
        SUM(wins)::float * 100 / (SUM(wins) + SUM(losses)) AS winPC
    FROM TeamStats GROUP BY abbrev
) A
ORDER BY winPC DESC
LIMIT 10;

-- Sort by most bookmarked players
SELECT Player.*, COALESCE(numBK, 0) AS numBK
FROM Player NATURAL LEFT JOIN (
    SELECT pid, COUNT(uid) AS numBK
    FROM Bookmarks GROUP BY pid
) A
ORDER BY numBK DESC, pid ASC
LIMIT 10;
