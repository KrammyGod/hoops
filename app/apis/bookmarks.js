import { query } from "../modules/pool.js";

const createBookmarkHandler = async (pid, uid) => {
    const res = await query(
        'INSERT INTO Bookmarks (pid, uid) VALUES ($1, $2)',
        [pid, uid]
    )
    return res
}

export const createBookmark = async (req, res) => {
    try {
        const data = await createBookmarkHandler(req.body.pid, req.body.uid);
        console.log(data);
        res.status(200).json({ data });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}