import { query } from "../modules/pool";

async function insertUser(email, password, name, role) {
    // Returns the user that was inserted to ensure successful insertion
    // TODO: Hash password
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

async function addAdmin(email, password, name) {
    return insertUser(email, password, name, 'admin');
}

// changed from uid passed in (how would the frontend know the uid without this func)
// consider having email be part of primary key (unique)
async function getUser(email, name) {
    return query(`
        SELECT uid, email, uName, uRole FROM HUser
        WHERE email = $1 AND uName = $2
    `, [email, name]).then(res => res.rows[0]);
}

async function updateUser(uid, email, password, name) {
    // Returns the user that was updated to ensure successful update
    // TODO: Call hash password function?
    const res = await query(`
        UPDATE HUser
        SET uName = $1, email = $2, hash = $3
        WHERE uid = $4
        RETURNING uid, email, uName, uRole
    `, [name, email, password, uid]);
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

export const usersHandler = async (req, res, session) => {
    switch (req.query.type) {
        case "signup":
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
        case "get":
            try {
                // Only admins are allowed to get users
                if (!session || session.user.role != 'admin') {
                    return res.status(401).json({ messages: 'unauthorized' });
                }

                const data = await getUser(req.body.email, req.body.username);
                res.status(200).json({ data });
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case "delete":
            try {
                // Only admins or the user are allowed to delete users
                if (!session || session.user.role != 'admin' || session.user.uid != req.body.uid) {
                    return res.status(401).json({ messages: 'unauthorized' });
                }

                const success = await deleteUser(req.body.uid, req.body.password);

                if (success) {
                    res.status(200).json({ success: true });
                } else {
                    res.status(400).json({ messages: "invalid password or user" });
                }
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        case "update":
            // Only admins or the user are allowed to update users
            if (!session || session.user.role != 'admin' || session.user.uid != req.body.uid) {
                return res.status(401).json({ messages: 'unauthorized' });
            }

            try {
                const data = await updateUser(req.body.uid, req.body.email, req.body.password, req.body.username);
                res.status(200).json({ data: data });
            } catch (err) {
                res.status(500).json({ messages: err.message });
            }
            break;
        default:
            res.status(401).json({ messages: "Not found." });
    }
}
