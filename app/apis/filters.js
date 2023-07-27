import { query } from "@modules/pool.js";

/* Returns players satisfying filter requirements */
async function filterPlayers(rebounds, assists, points, games, season, page) {
    const res = await query(`
        SELECT 
            pid AS id, 
            (firstName || ' ' || lastName) AS name,
            games, points, assists, rebounds, season
        FROM Player 
        NATURAL JOIN PlayerStats 
        WHERE 
            (rebounds >= $1 OR $1 IS NULL) AND
            (assists >= $2 OR $2 IS NULL) AND
            (points >= $3 OR $3 IS NULL) AND
            (games >= $4 OR $4 IS NULL) AND
            (season = $5 OR $5 IS NULL)
        ORDER BY name ASC, season DESC
        LIMIT 10
        OFFSET $6 * 10;
    `, [rebounds, assists, points, games, season, page]);
    return res.rows;
}

/* Returns teams satisfying filter requirements */
async function filterTeams(wins, losses, season, page) {
    const res = await query(`
        SELECT 
            abbrev AS id, 
            tname AS name, 
            wins, losses, season
        FROM Team 
        NATURAL JOIN TeamStats
        WHERE 
            (wins >= $1 OR $1 IS NULL) AND
            (losses >= $2 OR $2 IS NULL) AND
            (season = $3 OR $3 IS NULL)
        ORDER BY name ASC, season DESC
        LIMIT 10
        OFFSET $4 * 10;
        `, [wins, losses, season, page]);
    return res.rows;
}

export const playerFilter = async (req, res) => {
    const q = req.query;
    try {
        if (q.rebounds == -1) q.rebounds = null
        if (q.assists == -1) q.assists = null
        if (q.points == -1) q.points = null
        if (q.games == -1) q.games = null
        if (q.season == -1) q.season = null
        const data = await filterPlayers(q.rebounds, q.assists, q.points, q.games, q.season, q.page);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}

export const teamFilter = async (req, res) => {
    const q = req.query;
    try {
        if (q.wins == -1) q.wins = null
        if (q.losses == -1) q.losses = null
        if (q.season == -1) q.season = null
        const data = await filterTeams(q.wins, q.losses, q.season, q.page);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}
