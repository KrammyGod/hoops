-- INSERT NEW USER --
INSERT INTO HUser (hash, email, uName, uRole)
VALUES ('f222f', 'bruce@gmail.com', 'Bruce', 'user');

-- GET USER INFO --
SELECT * 
FROM HUser 
WHERE uid = 2;

-- UPDATE USER INFO --
UPDATE HUser
SET hash = 'f555f',
    email = 'clark@gmail.com', 
    uName = 'Clark' 
WHERE uid = 2;

-- HASH RETRIEVAL TO VERIFY LOGIN --
-- UNIQUE CONSTRAINT ON EMAIL IMPLICITY CREATES AN INDEX FOR EMAIL --
SELECT hash 
FROM HUser
WHERE email = 'clark@gmail.com';

-- DELETE USER --
-- BOOKMARKS DELETED USING ON DELETE CASCADE --
DELETE FROM HUser 
WHERE uid = 2;
