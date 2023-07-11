---------- R9: Brandon ----------
-- Add user to demonstrate bookmarking
INSERT INTO HUser (hash, email, uName, uRole)
VALUES ('22f22', 'beta@example.com', 'Beta', 'admin');

/* INSERT PLAYERS INTO BOOKMARKS */
INSERT INTO Bookmarks (uid, pid) VALUES (1, 2);

/* GET BOOKMARK ENTRY FOR USER */
SELECT * FROM Bookmarks WHERE pid = 2 AND uid = 1;

/* GET ALL PLAYERS FROM BOOKMARKS */
SELECT * FROM Bookmarks NATURAL JOIN Player WHERE uid = 1 LIMIT 10 OFFSET 0 * 10;

/* DELETE PLAYERS FROM BOOKMARKS */
DELETE FROM Bookmarks WHERE pid = 2 AND uid = 1;
