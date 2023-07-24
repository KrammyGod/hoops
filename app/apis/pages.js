import { query } from "@modules/pool.js";

const size = 10

/* Pages for All Teams */
async function team() {
    const res = await query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM Team;`, [size]);
    return res.rows[0];
}

/* Pages for All Players */
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

/* Pages for Leaderboards */
async function ldbd(type) {
    let res = null;
    if (type == 'twpt' || type == 'pwpt') {
        res = team()
    } else if (type == 'appp' || type == 'mbp') {
        res = plyr()
    }
    return res;
}

export async function getPages(req, res) {
    let data = null;
    try {
        switch (req.query.optn) {
            case "team":
                data = await team();
                break;
            case "plyr":
                data = await plyr();
                break;
            case "ldbd":
                data = await ldbd(req.query.type);
                break;
            case "bkmk":
                data = await bkmk(req.query.user);
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
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}