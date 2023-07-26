import { query } from "@modules/pool.js";

const size = 10

/* Pages for Teams */
async function team() {
    const res = await query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM Team;`, [size]);
    return res.rows[0];
}

/* Pages for Players */
async function plyr() {
    const res = await query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM Player;`, [size]);
    return res.rows[0];
}

/* Pages for Search Team */
async function srtm(name) {
    const res = await query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM Team 
        WHERE tName ILIKE ('%' || $2 || '%');`, [size, name]);
    return res.rows[0];
}

/* Pages for Search Player */
async function srpl(name) {
    const res = await query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM Player
        WHERE (firstName || ' ' || lastName) 
        ILIKE ('%' || $2 || '%');`, [size, name]);
    return res.rows[0];
}

/* Pages for Bookmarks */
async function bkmk(uid) {
    const res = await query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM Bookmarks 
        WHERE uid = $2;`, [size, uid]);
    return res.rows[0];
}

export async function getPages(req, res, session) {
    let data = null;
    const uid = req.body.uid ?? session?.user.id;
    try {
        switch (req.query.optn) {
            case "team":
                data = await team();
                break;
            case "plyr":
                data = await plyr();
                break;
            case "bkmk":
                data = await bkmk(uid);
                break;
            case "srtm":
                data = await srtm(req.query.name);
                break;
            case "srpl":
                data = await srpl(req.query.name);
                break;
            default:
                throw new Error("Invalid Page type");
        }
        if (data === null) throw new Error("No data found");
        if (data.total == 0) data.total = 1;
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ messages: err.message });
    }
}
