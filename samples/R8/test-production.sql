---------- R8: Saboor ----------
-- INSERT NEW USER --
INSERT INTO HUser(hash, email, uName, uRole)
VALUES ('f222f', 'bruce@gmail.com', 'Bruce', 'admin');

-- GET USER INFO USING EMAIL (INDEX FOR EMAIL CREATED) --
SELECT * FROM HUser WHERE uid = 1;

-- GET USER INFO USING UID --
SELECT * FROM HUser WHERE uid = 1;

-- UPDATE USER INFO --
UPDATE HUser
SET uName = 'Clark', email = 'clark@gmail.com', hash = 'f555f'
WHERE email = 'bruce@gmail.com';

-- VERIFY LOGIN --
SELECT * FROM HUser
WHERE email = 'clark@gmail.com' AND hash = 'f555f';

-- DELETE USER --
-- BOOKMARKS DELETED USING ON DELETE CASCADE --
DELETE FROM HUser WHERE email = 'clark@gmail.com';
