---------- R11: Mark ----------
-- Sort by average points per game per player
SELECT
    pid AS id,
    (firstName || ' ' || lastName) AS name,
    ROUND(ppg, 1) AS value
FROM Player NATURAL JOIN (
    SELECT pid, SUM(points)::numeric / SUM(games) AS ppg
    FROM PlayerStats
    GROUP BY pid
) A
ORDER BY ppg DESC
LIMIT 10
OFFSET 0 * 10;

-- Sort by total wins per team
SELECT abbrev AS id, tname AS name, totWins AS value
FROM Team NATURAL JOIN (
    SELECT abbrev, SUM(wins) AS totWins
    FROM TeamStats GROUP BY abbrev
) A
ORDER BY totWins DESC
LIMIT 10
OFFSET 0 * 10;

-- Sort by percentage of games won per team
SELECT abbrev AS id, tname AS name, ROUND(winPC, 2) AS value
FROM Team NATURAL JOIN (
    SELECT abbrev,
        SUM(wins)::numeric * 100 / (SUM(wins) + SUM(losses)) AS winPC
    FROM TeamStats GROUP BY abbrev
) A
ORDER BY winPC DESC
LIMIT 10
OFFSET 0 * 10;

-- Sort by most bookmarked players
SELECT pid AS id, (firstName || ' ' || lastName) AS name,
    COALESCE(numBK, 0) AS value
FROM Player NATURAL LEFT JOIN (
    SELECT pid, COUNT(uid) AS numBK
    FROM Bookmarks GROUP BY pid
) A
ORDER BY value DESC, pid ASC
LIMIT 10
OFFSET 0 * 10;
