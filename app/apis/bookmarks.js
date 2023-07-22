import { query } from '../modules/pool.js';

const createBookmark = async (req, res, session) => {
    try {
        const data = await query(
            'INSERT INTO Bookmarks (pid, uid) VALUES ($1, $2) RETURNING *',
            [req.body.pid, session.user.id]
        )
        res.status(200).json({ data: data.rows[0] })
    } catch (err) {
        res.status(500).json({ messages: err.messages })
    }
}

// This function will return all bookmarks if uid exists,
// but will return a specific bookmark if uid and pid exists
const getBookmarks = async (req, res, session) => {
    try {
        let data;
        if (req.body.hasOwnProperty('pid')) {
            data = await query(
                `SELECT * FROM Bookmarks NATURAL JOIN Player
                WHERE uid = $1 AND pid = $2
                ORDER BY firstName, lastName`,
                [session.user.id, req.body.pid]
            );
        } else {
            const page = (req.body.page ?? 1) - 1;
            if (page < 0) return res.status(400).json({ messages: 'Invalid page number' });
            data = await query(
                `SELECT * FROM Bookmarks NATURAL JOIN Player
                WHERE uid = $1 LIMIT 10 OFFSET $2 * 10
                ORDER BY firstName, lastName`,
                [session.user.id, page]
            );
        }
        res.status(200).json({ data: data.rows })
    } catch (err) {
        res.status(500).json({ messages: err.messages });
    }
}

const deleteBookmark = async (req, res, session) => {
    try {
        const data = await query(
            'DELETE FROM Bookmarks WHERE pid = $1 AND uid = $2 RETURNING *',
            [req.body.pid, session.user.id]
        )
        res.status(200).json({ data: data.rows[0] })
    } catch (err) {
        res.status(500).json({ messages: err.messages });
    }
}

export async function bookmarksHandler(req, res, session) {
    // We must guarantee that session exists before performing any sort of operation
    if (!session) return res.status(401).json({ messages: 'Unauthorized' });
    switch (req.query.type) {
        case 'create':
            await createBookmark(req, res, session);
            break;
        case 'delete':
            await deleteBookmark(req, res, session);
            break;
        case 'get':
            await getBookmarks(req, res, session);
            break;
        default:
            res.status(404).json({ messages: 'Not found.' });
    }
};
