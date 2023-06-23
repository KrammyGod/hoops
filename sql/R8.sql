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