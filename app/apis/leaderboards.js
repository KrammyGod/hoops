import { query } from "../modules/pool.js";

// All values are renamed to make switching tables seamless.

/* Total wins per team */
async function twpt() {
    const res = await query(
        `SELECT abbrev AS id, tname AS name, totWins AS value
        FROM Team NATURAL JOIN (
            SELECT abbrev, SUM(wins) AS totWins
            FROM TeamStats GROUP BY abbrev
        ) A
        ORDER BY totWins DESC
        LIMIT 10`
    );
    return res.rows;
}

/* Average points per player */
async function appp() {
    const res = await query(
        `SELECT
            pid AS id,
            (firstName || ' ' || lastName) AS name,
            ROUND(ppg, 1) AS value
        FROM Player NATURAL JOIN (
            SELECT pid, SUM(points)::numeric / SUM(games) AS ppg
            FROM PlayerStats
            GROUP BY pid
        ) A
        ORDER BY ppg DESC
        LIMIT 10`
    );
    return res.rows;
}

/* Percentage of games won per team */
async function pgpt() {
    const res = await query(
        `SELECT abbrev AS id, tname AS name, ROUND(winPC, 2) AS value
        FROM Team NATURAL JOIN (
            SELECT abbrev,
                SUM(wins)::numeric * 100 / (SUM(wins) + SUM(losses)) AS winPC
            FROM TeamStats GROUP BY abbrev
        ) A
        ORDER BY winPC DESC
        LIMIT 10`
    );
    return res.rows;
}

/* Most bookmarked players */
async function mbp() {
    const res = await query(
        `SELECT pid AS id, (firstName || ' ' || lastName) AS name,
            COALESCE(numBK, 0) AS value
        FROM Player NATURAL LEFT JOIN (
            SELECT pid, COUNT(uid) AS numBK
            FROM Bookmarks GROUP BY pid
        ) A
        ORDER BY value DESC, pid ASC
        LIMIT 10`
    );
    return res.rows;
}

export async function getLeaderboards(req, res) {
    try {
        let data = null;
        switch (req.query.type) {
            case "twpt":
                data = await twpt();
                break;
            case "appp":
                data = await appp();
                break;
            case "pgpt":
                data = await pgpt();
                break;
            case "mbp":
                data = await mbp();
                break;
            default:
                throw new Error("Invalid leaderboard type");
        }
        // Somehow reached null data
        if (data === null) throw new Error("No data found");
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ messages: err.message });
    }
};
