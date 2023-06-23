/* INSERT NEW USER */
INSERT INTO huser (hash, email, uname, urole)
VALUES ('f222f', 'john@example.com', 'John', 'admin');

/* GET USER INFO */
SELECT * FROM huser WHERE uid = 1;

/* UPDATE USER INFO */
UPDATE huser
SET uname = 'Brad', email = 'brad@gmail.com', hash = 'f555f'
WHERE uid = 1;

/* VERIFY LOGIN */
SELECT * FROM huser
WHERE email = 'brad@gmail.com' and hash = 'f555f';

/* DELETE USER */
/* BOOKMARKS DELETED USING ON DELETE CASCADE */
DELETE FROM huser WHERE uid = 1;