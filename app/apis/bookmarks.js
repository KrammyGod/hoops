import { query } from "../modules/pool.js";

const createBookmarkHandler = async (pid, uid) => {
    const res = await query(
        'INSERT INTO Bookmarks (pid, uid) VALUES ($1, $2) RETURNING *',
        [pid, uid]
    )
    return res
}

export const createBookmark = async (req, res) => {
    try {
        const data = await createBookmarkHandler(req.body.pid, req.body.uid);
        res.status(200).json({ data: data.rows });
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}

// This function will return all bookmarks if uid exists,
// but will return a specific bookmark if uid and pid exists
export const getBookmarks = async (req, res) => {
    try {
        var data;
        if (req.body.hasOwnProperty("pid")) {
            data = await query(
                'SELECT * FROM Bookmarks NATURAL JOIN Player WHERE uid = $1 AND pid = $2',    // maybe have IF EXISTS
                [req.body.uid, req.body.pid]
            )
        } else {
            data = await query(
                'SELECT * FROM Bookmarks NATURAL JOIN Player WHERE uid = $1',
                [req.body.uid]
            )
        }
        res.status(200).json({ data: data.rows })
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}

export const deleteBookmark = async (req, res) => {
    try {
        const data = await query(
            'DELETE FROM Bookmarks WHERE pid = $1 AND uid = $2 RETURNING *',
            [req.body.pid, req.body.uid]
        )
        res.status(200).json({ data: {pid: req.body.pid, uid: req.body.uid} })
    } catch (err) {
        res.status(501).json({ messages: err.stack });
    }
}
