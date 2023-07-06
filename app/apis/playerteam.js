import { query } from "../modules/pool.js";

/* Returns all players matching name */
async function searchPlayerName(name) {
    const res = await query(`
        SELECT * FROM Player
        WHERE (firstName || ' ' || lastName) ILIKE
        ('%' || $1 || '%')
    `, [name]);
    return res.rows;
}

/* Returns all teams matching name */
async function searchTeamByName(name) {
    const res = await query(`
        SELECT * FROM Team
        WHERE tName ILIKE ('%' || $1 || '%')
    `, [name]);
    return res.rows;
}
/* USED FOR PUBLIC FACING THINGS ("/player/:id")
export const searchPlayerByName = async (req, res) => {
    //console.log(req.params.id);
    try {
        const data = await searchPlayerName(req.params.id);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}
*/
export const searchPlayerByName = async (req, res) => {
    try {
        const data = await searchPlayerName(req.body.name);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}