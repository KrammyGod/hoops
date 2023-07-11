---------- R8: Saboor ----------
-- INSERT NEW USER --
INSERT INTO HUser (hash, email, uName, uRole)
VALUES ('f222f', 'bruce@gmail.com', 'Bruce', 'user');

-- GET USER INFO USING EMAIL --
-- INDEX FOR EMAIL CREATED IMPLICITLY AS EMAIL HAS A UNIQUE CONSTRAINT --
SELECT * 
FROM HUser 
WHERE email = 'bruce@gmail.com';

-- UPDATE USER INFO --
UPDATE HUser
SET hash = 'f555f',
    email = 'clark@gmail.com', 
    uName = 'Clark' 
WHERE email = 'bruce@gmail.com';

-- VERIFY LOGIN --
SELECT COUNT(*) 
FROM HUser
WHERE email = 'clark@gmail.com' AND hash = 'f555f';

-- DELETE USER --
-- BOOKMARKS DELETED USING ON DELETE CASCADE --
DELETE FROM HUser 
WHERE email = 'clark@gmail.com';
