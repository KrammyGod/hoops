/* INSERT PLAYERS INTO WATCHLIST */
INSERT INTO bookmarks VALUES (..., ...);

/* GET PLAYERS FROM WATCHLIST */
SELECT * FROM bookmarks JOIN player WHERE player.pid = ...;

/* DELETE PLAYERS FROM WATCHLIST */
DELETE FROM bookmarks WHERE bookmarks.pid = ...;