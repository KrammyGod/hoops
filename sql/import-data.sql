-----------------------------------------------------------------
-- Team Abbrev.csv
CREATE TEMPORARY TABLE tmp (
    season int,
    lg text,
    team text,
    playoffs text,
    abbreviation varchar(5)
);
-- Mass insert tmp
\copy tmp FROM './archive/Team Abbrev.csv' WITH (HEADER MATCH, FORMAT csv);

-- Copy only what we need from tmp
-- Team table
INSERT INTO Team (abbrev, tName)
SELECT DISTINCT ON (abbreviation)
    abbreviation,
    team
FROM tmp;

DROP TABLE tmp;
-----------------------------------------------------------------

-----------------------------------------------------------------
-- Player Season Info.csv
CREATE TEMPORARY TABLE tmp (
    season int,
    seas_id text,
    player_id int,
    player text,
    birth_year text,
    pos text,
    age text,
    -- lg = league
    lg text,
    -- tm = team abbrev
    tm varchar(5),
    experience text
);
-- Mass insert tmp
\copy tmp FROM './archive/Player Season Info.csv' WITH (HEADER MATCH, FORMAT csv);

-- Copy only what we need from tmp
-- Player table
INSERT INTO Player (firstName, lastName)
SELECT DISTINCT ON (player_id)
    split_part(player, ' ', 1) AS first_name,
    split_part(player, ' ', 2) AS last_name
FROM tmp ORDER BY player_id ASC;

-- PlayerStats table
INSERT INTO PlayerStats (pid, season, abbrev)
SELECT player_id, season, tm
FROM tmp
-- TOT is missing from Team abbrevs
WHERE tm <> 'TOT';

DROP TABLE tmp;
-----------------------------------------------------------------

-----------------------------------------------------------------
-- Team Summaries.csv
CREATE TEMPORARY TABLE tmp (
    season int,
    lg text,
    team text,
    abbreviation text,
    playoffs text,
    age text,
    w text,
    l text,
    -- Redundant information that we do not need,
    -- required columns for importing csv
    pw text,
	pl text,
	mov text,
	sos text,
	srs text,
	o_rtg text,
	d_rtg text,
	n_rtg text,
	pace text,
	f_tr text,
	x3p_ar text,
	ts_percent text,
	e_fg_percent text,
	tov_percent text,
	orb_percent text,
	ft_fga text,
	opp_e_fg_percent text,
	opp_tov_percent text,
	opp_drb_percent text,
	opp_ft_fga text,
	arena text,
	attend text,
    attend_g text
);
-- Mass insert tmp
\copy tmp FROM './archive/Team Summaries.csv' WITH (HEADER MATCH, FORMAT csv);

INSERT INTO TeamStats (abbrev, wins, losses, season)
SELECT abbreviation, w::int, l::int, season
-- Some columns have NA, they are ignored
FROM tmp WHERE w <> 'NA' AND l <> 'NA';

DROP TABLE tmp;
-----------------------------------------------------------------

-----------------------------------------------------------------
-- Player Totals.csv
CREATE TABLE tmp (

);

DROP TABLE tmp;
-----------------------------------------------------------------
