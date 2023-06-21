/* INSERT PLAYERS INTO WATCHLIST */
INSERT INTO bookmarks VALUES (..., ...);

/* GET SINGLE PLAYERS FROM WATCHLIST */
SELECT * FROM bookmarks, player WHERE player.pid = ... and bookmarks.pid = player.pid;

/* GET ALL PLAYERS FROM WATCHLIST */
SELECT * FROM bookmarks NATURAL JOIN player WHERE bookmarks.uid = ...;

/* DELETE PLAYERS FROM WATCHLIST */
DELETE FROM bookmarks WHERE bookmarks.pid = ... and bookmarks.uid = ...;