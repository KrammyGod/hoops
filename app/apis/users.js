import { query } from "../modules/pool";

async function insertUser(email, password, name, role) {
    // Returns the user that was inserted to ensure successful insertion
    // TODO: Hash password
    const res = await query(`
        INSERT INTO HUser (hash, email, uName, uRole)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [password, email, name, role]);
    return res.rows[0];
}
/*
function addUser(email, password, name) {
    return insertUser(email, password, name, 'user');
}
*/
async function addAdmin(email, password, name) {
    return await insertUser(email, password, name, 'admin');
}

// changed from uid passed in (how would the frontend know the uid without this func)
// consider having email be part of primary key (unique)
async function getUser(email, name) {
    return query(`
        SELECT * FROM HUser
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
        RETURNING *
    `, [name, email, password, uid]);
    return res.rows[0];
}

// This will never return error from promise...
/* Returns true if login is successful */
async function login(email, password) {
    // TODO: Hash?
    const res = await query(`
        SELECT * FROM HUser
        WHERE email = $1 and hash = $2;
    `, [email, password]);
    return res.rows[0];
}

async function deleteUser(uid) {
    // No return value required
    await query('DELETE FROM HUser WHERE uid = $1', [uid]);
}

export const usesHandler = async (req, res) => {
    switch (req.query.type) {
        case "signup":
            try {
                const data = await addAdmin(req.body.email, req.body.password, req.body.username);
                res.status(200).json({ data: {email: data["email"], username: data["uname"]} })
            } catch (err) {
                res.status(418).json({ messages: err.stack })
            }
            break;
        case "login":
            try {
                const data = await login(req.body.email, req.body.password);

                if (data.length != 0) {
                    res.status(200).json({ data: {uid: data["uid"], email: data["email"], username: data["uname"]} })
                } else {
                    res.status(400).json({ messages: "invalid login" })
                }
                
            } catch (err) {
                res.status(418).json({ messages: err.stack })
            }
            break;
        case "get":
            try {
                const data = await getUser(req.body.email, req.body.username);
                // don't expose the hash
                res.status(200).json({ data: {uid: data["uid"], email: data["email"], username: data["uName"], role: data["urole"]} })
            } catch (err) {
                res.status(418).json({ messages: err.stack })
            }
            break;
        case "update":
            try {
                const data = await updateUser(req.body.uid, req.body.email, req.body.password, req.body.username);
                const returnData = {...data}
                delete returnData["hash"]
                res.status(200).json({ data: returnData })
            } catch (err) {
                res.status(418).json({ messages: err.stack })
            }
            break;
        default:
            res.status(401).json("Not found.")
            throw new Error("Invalid route.")
    }
}