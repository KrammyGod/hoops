import { query } from "../modules/pool";

export async function insertUser(email, password, name, role) {
    // Returns the user that was inserted to ensure successful insertion
    // TODO: Hash password
    const res = await query(`
        INSERT INTO HUser (hash, email, uName, uRole)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [password, email, name, role]);
    return res.rows[0];
}

export function addUser(email, password, name) {
    return insertUser(email, password, name, 'user');
}

export function addAdmin(email, password, name) {
    return insertUser(email, password, name, 'admin');
}

export async function getUser(uid) {
    return query(`
        SELECT * FROM HUser
        WHERE uid = $1
    `, [uid]).then(res => res.rows[0]);
}

export async function updateUser(uid, email, password, name) {
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

/* Returns true if login is successful */
export async function login(email, password) {
    // TODO: Hash?
    const res = await query(`
        SELECT * FROM HUser
        WHERE email = $1 and hash = $2;
    `, [email, password]);1
    return res.rows.length !== 0;
}

export async function deleteUser(uid) {
    // No return value required
    return query('DELETE FROM HUser WHERE uid = $1', [uid]);
}