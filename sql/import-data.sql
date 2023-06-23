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
    substring(player, '^\w+') AS firstName,
    substring(player, '^\w+\s+(.*)') AS lastName
FROM tmp ORDER BY player_id ASC;

-- PlayerStats table
INSERT INTO PlayerStats (pid, season, abbrev)
SELECT player_id, season, tm
FROM tmp
-- TOT means multiple teams
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
    seas_id text,
    -- Our season
    season int,
    -- Our pid
    player_id int,
    player text,
    birth_year text,
    pos text,
    age text,
    experience text,
    lg text,
    -- Our abbrev
    tm varchar(5),
    -- Games
    g int,
    gs text,
    mp text,
    fg text,
    fga text,
    fg_percent text,
    x3p text,
    x3pa text,
    x3p_percent text,
    x2p text,
    x2pa text,
    x2p_percent text,
    e_fg_percent text,
    ft text,
    fta text,
    ft_percent text,
    orb text,
    drb text,
    -- Total rebounds
    trb text,
    -- Assists
    ast int,
    stl text,
    blk text,
    tov text,
    pf text,
    -- Points
    pts int
);
-- Mass insert tmp
\copy tmp FROM './archive/Player Totals.csv' WITH (HEADER MATCH, FORMAT csv);

-- Set to NULL instead of NA as text to allow converting into int
UPDATE tmp SET trb = NULL WHERE trb = 'NA';

-- We do upsert trick, if the PK already exists,
-- we update the values.
INSERT INTO PlayerStats (pid, season, abbrev, games, assists, rebounds, points)
SELECT player_id, season, tm, g, ast, trb::int, pts
FROM tmp WHERE tm <> 'TOT' -- TOT means multiple teams
ON CONFLICT (pid, season, abbrev) DO UPDATE
-- This updates all the columns with the ones from tmp
-- that failed to update due to conflict.
SET games = EXCLUDED.games,
    assists = EXCLUDED.assists,
    rebounds = EXCLUDED.rebounds,
    points = EXCLUDED.points;

DROP TABLE tmp;
-----------------------------------------------------------------
