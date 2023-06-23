/* INSERT PLAYERS INTO WATCHLIST */
INSERT INTO bookmarks (pid, uid) VALUES (..., ...);

/* GET BOOKMARK ENTRY FOR USER */
SELECT * FROM bookmarks WHERE bookmarks.pid = ... and bookmarks.uid = ...;

/* GET ALL PLAYERS FROM WATCHLIST */
SELECT * FROM bookmarks NATURAL JOIN player WHERE bookmarks.uid = ...;

/* DELETE PLAYERS FROM WATCHLIST */
DELETE FROM bookmarks WHERE bookmarks.pid = ... and bookmarks.uid = ...;