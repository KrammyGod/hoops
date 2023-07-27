import { query } from '@modules/pool.js';

/* Returns all players matching name */
async function searchPlayerName(name, page) {
    const res = await query(`
        SELECT * FROM Player
        WHERE (firstName || ' ' || lastName) ILIKE
        ('%' || $1 || '%') 
        LIMIT 10
        OFFSET $2 * 10;
    `, [name, page]);
    return res.rows;
}

/* Returns all teams matching name */
async function searchTeamName(name, page) {
    const res = await query(`
        SELECT * FROM Team
        WHERE tName ILIKE ('%' || $1 || '%') 
        LIMIT 10
        OFFSET $2 * 10;
    `, [name, page]);
    return res.rows;
}

export const searchTeamByName = async (req, res) => {
    try {
        let page = (req.query.page ?? 1) - 1;
        page = (page < 0) ? 1 : page;
        const data = await searchTeamName(req.query.id, page);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}

export const searchPlayerByName = async (req, res) => {
    try {
        let page = (req.query.page ?? 1) - 1;
        page = (page < 0) ? 1 : page;
        const data = await searchPlayerName(req.query.id, page);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}
