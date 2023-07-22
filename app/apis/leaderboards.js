import { query } from "@modules/pool.js";

// All values are renamed to make switching tables seamless.

/* Total wins per team */
async function twpt(page) {
    const res = await query(
        `SELECT abbrev AS id, tname AS name, totWins AS value
        FROM Team NATURAL JOIN (
            SELECT abbrev, SUM(wins) AS totWins
            FROM TeamStats GROUP BY abbrev
        ) A
        ORDER BY totWins DESC
        LIMIT 10
        OFFSET $1 * 10`,
        [page]
    );
    return res.rows;
}

/* Average points per player */
async function appp(page) {
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
        LIMIT 10
        OFFSET $1 * 10`,
        [page]
    );
    return res.rows;
}

/* Percentage of games won per team */
async function pgpt(page) {
    const res = await query(
        `SELECT abbrev AS id, tname AS name, ROUND(winPC, 2) AS value
        FROM Team NATURAL JOIN (
            SELECT abbrev,
                SUM(wins)::numeric * 100 / (SUM(wins) + SUM(losses)) AS winPC
            FROM TeamStats GROUP BY abbrev
        ) A
        ORDER BY winPC DESC
        LIMIT 10
        OFFSET $1 * 10`,
        [page]
    );
    return res.rows;
}

/* Most bookmarked players */
async function mbp(page) {
    const res = await query(
        `SELECT pid AS id, (firstName || ' ' || lastName) AS name,
            COALESCE(numBK, 0) AS value
        FROM Player NATURAL LEFT JOIN (
            SELECT pid, COUNT(uid) AS numBK
            FROM Bookmarks GROUP BY pid
        ) A
        ORDER BY value DESC, pid ASC
        LIMIT 10
        OFFSET $1 * 10`,
        [page]
    );
    return res.rows;
}

export async function getLeaderboards(req, res) {
    const page = (req.query.page ?? 1) - 1;
    if (page < 0) return res.status(400).json({ messages: "Invalid page number" });
    try {
        let data = null;
        switch (req.query.type) {
            case "twpt":
                data = await twpt(page);
                break;
            case "appp":
                data = await appp(page);
                break;
            case "pgpt":
                data = await pgpt(page);
                break;
            case "mbp":
                data = await mbp(page);
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
