import { query } from '@modules/pool';

async function insertUser(email, password, name, role) {
    // Returns the user that was inserted to ensure successful insertion
    const res = await query(`
        INSERT INTO HUser (hash, email, uName, uRole)
        VALUES ($1, $2, $3, $4)
        RETURNING uid, email, uName, uRole
    `, [password, email, name, role]);
    return res.rows[0];
}

async function addUser(email, password, name) {
    return insertUser(email, password, name, 'user');
}

async function updateAdmin(uid, name, role) {
    const res = await query(`
        UPDATE HUser
        SET uName = $1, uRole = $2
        WHERE uid = $3
        RETURNING *
    `, [name, role, uid])

    return res.rows[0];
}

async function getUser(uid) {
    return query(`
        SELECT uid, email, uName, uRole FROM HUser
        WHERE uid = $1
    `, [uid]).then(res => res.rows[0]);
}

async function getAllUsers(uid, page) {
    return query(`
        SELECT uid, email, uName, uRole
        FROM HUser
        WHERE uid <> $1
        ORDER BY uid
        LIMIT 10
        OFFSET $2 * 10`,
        [uid, page]
    ).then(res => res.rows);
}

async function updateUser(uid, email, old_password, name, new_password) {
    if (!new_password) new_password = old_password;
    // Returns the user that was updated to ensure successful update
    const res = await query(`
        UPDATE HUser
        SET uName = $1, email = $2, hash = $3
        WHERE uid = $4 AND hash = $5
        RETURNING uid, email, uName, uRole
    `, [name, email, new_password, uid, old_password]);
    return res.rows[0];
}

async function deleteUser(uid, hash) {
    // No return value required
    const res = await query(`
        DELETE FROM HUser 
        WHERE uid = $1 AND hash = $2
        RETURNING uid
    `, [uid, hash]);
    return res.rows.length != 0;
}

async function deleteUserAdmin(uid) {
    // No return value required
    const res = await query(`
        DELETE FROM HUser 
        WHERE uid = $1
        RETURNING uid
    `, [uid]);
    return res.rows.length != 0;
}

export const usersHandler = async (req, res, session) => {
    // Prioritize uid in body
    // If none provided, then assume user is doing on own behalf
    const uid = req.body.uid ?? session?.user.id;
    switch (req.query.type) {
        case 'adminUpdate':
            try {
                if (!session || session.user.role != 'admin') {
                    // If user is not admin, shouldn't be able to create new admins
                    return res.status(401).json({ messages: 'unauthorized' });
                }

                const data = await updateAdmin(req.body.uid, req.body.username, req.body.role);
                res.status(200).json({ data });
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case 'signup':
            try {
                if (session && session.user.role != 'admin') {
                    // If user is not admin, shouldn't be able to create new users
                    // Otherwise they're not logged in, so they can sign up.
                    return res.status(401).json({ messages: 'unauthorized' });
                }

                const data = await addUser(req.body.email, req.body.password, req.body.username);
                res.status(200).json({ data });
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case 'get':
            try {
                // Only admins are allowed to get users
                if (!session || session.user.role != 'admin') {
                    return res.status(401).json({ messages: 'unauthorized' });
                }

                const data = await getUser(req.body.uid);
                res.status(200).json({ data });
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case 'getAll':
            // This gets all users that are not the current user
            try {
                if (!session || session.user.role != 'admin') {
                    return res.status(401).json({ messages: 'unauthorized' });
                }
                
                const page = (req.query.page ?? 1) - 1;
                if (page < 0) return res.status(400).json({ messages: 'Invalid page number' });
                const data = await getAllUsers(session.user.id, page);
                res.status(200).json({ data });
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case 'deleteAdmin':
            try {
                // Only admins are allowed to delete users
                if (!session || session.user.role !== 'admin') {
                    return res.status(401).json({ messages: 'unauthorized' });
                }

                const success = await deleteUserAdmin(uid);
                if (success) {
                    res.status(200).json({ success: true });
                } else {
                    res.status(401).json({ messages: 'invalid user id' });
                }
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case 'delete':
            try {
                if (!session) {
                    return res.status(401).json({ messages: 'unauthorized' });
                }
                
                // User is only allowed to delete themself
                const success = await deleteUser(session.user.id, req.body.password);
                if (success) {
                    res.status(200).json({ success: true });
                } else {
                    res.status(401).json({ messages: 'invalid password or user' });
                }
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case 'update':
            // Only admins or the user are allowed to update users
            if (!session || (session.user.role !== 'admin' && session.user.id != uid)) {
                return res.status(401).json({ messages: 'unauthorized' });
            }

            try {
                const data = await updateUser(uid, req.body.email, req.body.old_password, req.body.username, req.body.new_password);
                if (data) {
                    res.status(200).json({ data });
                } else {
                    res.status(401).json({ messages: 'invalid password' });
                }
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        default:
            res.status(404).json({ messages: 'Not found.' });
    }
}
