# Required:
Download Postgres V14+ (V15 preferred) at https://www.postgresql.org/download/

# Setting up Environment:
First, you can login with:

`psql -h db.qqbfgpnkateniubtbotc.supabase.co -p 5432 -d test_db -U user_name`, replacing `user_name` with the one you were provided.
You will be prompted to enter your password, you can change your password once you logged in, by typing `\password`

Basically, the database host is `db.qqbfgpnkateniubtbotc.supabase.co`, the port # is `5432`, the database name is `test_db` and the user you are logging into is `user_name`

Finally, if you are tired of typing your password all the time, you can do
`psql postgres://user_name:password@db.qqbfgpnkateniubtbotc.supabase.co/test_db` to auto login, changing `password` to whatever your password is

You can simply replace `test_db` with whatever the database name is, once we confirm a name.

To login locally in the repo, you must put the following in your repo's .env file (you have to create one, a sample has been provided)
```
PGHOST=db.qqbfgpnkateniubtbotc.supabase.co
PGDATABASE=test_db
PGUSER=user_name
PGPASSWORD=password
```
Replacing `user_name` with your username, `password` with your password, and `test_db` with whatever database you wish to use. REMEMBER TO NOT COMMIT THIS FILE!!!! (should be already included in .gitignore)

# Directories

~/sql <- folder containing all .sql files (schema/queries)

# Importing CSV Datasets
Create a temporary table with ALL the columns in the CSV, so that we can use the `\copy` command:
```
CREATE TEMPORARY TABLE tmp (column_names data_type);
```
Remember that you can also modify this table for values that should be NULL, but aren't:
```
UPDATE tmp SET column = NULL WHERE column = 'NA'
```
Then, create the actual table with the dataset we want:
```
CREATE TABLE table_name (column_names data_type);
```
Copy all values from CSV to temporary table:
```
\copy tmp FROM '/path/to/file' WITH (HEADER MATCH, FORMAT csv);
```
Copy all required columns from tmp to actual table:
```
INSERT INTO table_name SELECT column_names FROM tmp;
```
Delete tmp to reuse:
```
DROP TABLE tmp;
```

# How to save .out from .sql
You have two options:
## Option 1
In your .sql file, include this line at the top of the file:
```
\o sample.out
```
and run it with
```
cat sample.sql | psql -h db.qqbfgpnkateniubtbotc.supabase.co -p 5432 -d test_db -U user_name
```
or on Windows:
```
type sample.sql | psql -h db.qqbfgpnkateniubtbotc.supabase.co -p 5432 -d test_db -U user_name
```

## Option 2
Simply use output redirection:
```
cat sample.sql | psql -h db.qqbfgpnkateniubtbotc.supabase.co -p 5432 -d test_db -U user_name > sample.out
```
or on Windows:
```
type sample.sql | psql -h db.qqbfgpnkateniubtbotc.supabase.co -p 5432 -d test_db -U user_name > sample.out
```
An example of option 1 is included in /examples/sample.sql
