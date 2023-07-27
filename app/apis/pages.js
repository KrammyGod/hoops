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

/* Pages for Filters Teams*/
async function fltm(wins, losses, season) {
    const res = await query(`
    SELECT CEIL(COUNT(*)::float / $4) AS total
    FROM Team NATURAL JOIN TeamStats
    WHERE 
        (wins >= $1 OR $1 IS NULL) AND
        (losses >= $2 OR $2 IS NULL) AND
        (season = $3 OR $3 IS NULL);`
    , [wins, losses, season, size]);
    return res.rows[0];
}

/* Pages for Users*/
async function users() {
    return query(`
        SELECT CEIL(COUNT(*)::float / $1) AS total
        FROM HUser`, 
        [size]
    )
    .then(res => res.rows);
}

/* Pages for Filters Pages */
async function flpl(rebounds, assists, points, games, season) {
    const res = await query(`
    SELECT CEIL(COUNT(*)::float / $6) AS total
    FROM Player NATURAL JOIN PlayerStats 
    WHERE 
        (rebounds >= $1 OR $1 IS NULL) AND
        (assists >= $2 OR $2 IS NULL) AND
        (points >= $3 OR $3 IS NULL) AND
        (games >= $4 OR $4 IS NULL) AND
        (season = $5 OR $5 IS NULL);`
    , [rebounds, assists, points, games, season, size]);
    return res.rows[0];
}

export async function getPages(req, res, session) {
    let data = null;
    const q = req.query
    const uid = req.body.uid ?? session?.user.id;
    try {
        switch (req.query.optn) {
            case "team":
                data = await team();
                break;
            case "plyr":
                data = await plyr();
                break;
            case "users":
                data = await users();
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
            case "fltm":
                if (q.wins == -1) q.wins = null
                if (q.losses == -1) q.losses = null
                if (q.season == -1) q.season = null
                data = await fltm(q.wins, q.losses, q.season);
                break;
            case "flpl":
                if (q.rebounds == -1) q.rebounds = null
                if (q.assists == -1) q.assists = null
                if (q.points == -1) q.points = null
                if (q.games == -1) q.games = null
                if (q.season == -1) q.season = null
                data = await flpl(q.rebounds, q.assists, q.points, q.games, q.season);
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
