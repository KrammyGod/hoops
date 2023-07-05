const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

async function query(text, params) {
    const client = await pool.connect();
    let res = undefined;
    try {
        await client.query('BEGIN');
        res = await client.query(text, params);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    return res;
};

// Feature: Smart searching for players and teams
/* Returns all players matching name */
async function searchPlayerByName(name) {
    const res = await query(`
        SELECT * FROM Player
        WHERE (firstName || ' ' || lastName) ILIKE
        ('%' || $1 || '%')
    `, [name]);
    return res.rows;
}

/* Returns all teams matching name */
async function searchTeamByName(name) {
    const res = await query(`
        SELECT * FROM Team
        WHERE tName ILIKE ('%' || $1 || '%')
    `, [name]);
    return res.rows;
}

// Feature: Modifying users
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

function addUser(email, password, name) {
    return insertUser(email, password, name, 'user');
}

function addAdmin(email, password, name) {
    return insertUser(email, password, name, 'admin');
}

async function getUser(uid) {
    return query(`
        SELECT * FROM HUser
        WHERE uid = $1
    `, [uid]).then(res => res.rows[0]);
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

/* Returns true if login is successful */
async function login(email, password) {
    // TODO: Hash?
    const res = await query(`
        SELECT * FROM HUser
        WHERE email = $1 and hash = $2;
    `, [email, password]);1
    return res.rows.length !== 0;
}

async function deleteUser(uid) {
    // No return value required
    return query('DELETE FROM HUser WHERE uid = $1', [uid]);
}

module.exports = {
    login
};
