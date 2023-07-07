---------- R9: Brandon ----------
-- Add user to demonstrate bookmarking
INSERT INTO HUser (hash, email, uName, uRole)
VALUES ('22f22', 'beta@example.com', 'Beta', 'admin');

/* INSERT PLAYERS INTO WATCHLIST */
INSERT INTO Bookmarks (pid, uid) VALUES (1, 2);

/* GET BOOKMARK ENTRY FOR USER */
SELECT * FROM Bookmarks WHERE pid = 1 AND uid = 2;

/* GET ALL PLAYERS FROM WATCHLIST */
SELECT * FROM Bookmarks NATURAL JOIN Player WHERE uid = 2;

/* DELETE PLAYERS FROM WATCHLIST */
DELETE FROM Bookmarks WHERE pid = 1 AND uid = 2;
