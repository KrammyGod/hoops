\o sample.out
SELECT * FROM Team;
-- Fake update that should never work
UPDATE HUser SET uname = 'Mark' WHERE uid = -1;
SELECT * FROM HUser;
