import { query } from "../modules/pool.js";

/*  Gets Player Stats */
export async function getPlayerStats(pid) {
    const res1 = await query('SELECT * FROM Player WHERE pid = $1', [pid]);
    const res2 = await query(`
        SELECT assists, points, games, season, abbrev, tname 
        FROM PlayerStats
        NATURAL JOIN Team
        WHERE pid = $1
        ORDER BY season DESC`, [pid]);
    return {
        player: res1.rows[0],
        stats: res2.rows,
    };
};

/*  Gets Team Stats */
export async function getTeamStats(abbrev) {
    const res1 = await query('SELECT * FROM Team WHERE abbrev LIKE $1', [abbrev]);
    const res2 = await query(`
        SELECT wins, losses, season
        FROM TeamStats
        WHERE abbrev LIKE $1
        ORDER BY season DESC`, [abbrev]);
    return {
        team: res1.rows[0],
        stats: res2.rows,
    };
};

/*  Gets All Players Stats */
export async function getAllPlayerStats() {
    const res = await query(`
        SELECT pid, firstName || ' ' || lastName AS name,
        ROUND(SUM(assists)) AS asts,
        ROUND(SUM(rebounds)) AS trbs, 
        ROUND(SUM(points)) AS pts,
        ROUND(SUM(games)) AS games,
        ROUND(COUNT(season)) AS seasons
        FROM Player NATURAL JOIN PlayerStats
        GROUP BY pid, firstName, lastName
        ORDER BY name`);
    return res.rows;
};

/*  Gets All Teams Stats */
export async function getAllTeamStats() {
    const res = await query(`
        SELECT abbrev, tname,
        ROUND(AVG(wins)) AS wins,
        ROUND(AVG(losses)) AS losses,
        COUNT(season) AS seasons
        FROM Team NATURAL JOIN TeamStats
        GROUP BY abbrev, tname
        ORDER BY abbrev`);
    return res.rows;
};