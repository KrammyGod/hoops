import pg from "pg";
const { Pool } = pg;
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
export async function searchPlayerByName(name) {
    const res = await query(`
        SELECT * FROM Player
        WHERE (firstName || ' ' || lastName) ILIKE
        ('%' || $1 || '%')
    `, [name]);
    return res.rows;
}

/* Returns all teams matching name */
export async function searchTeamByName(name) {
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

// Feature 7
/*  Gets Player Stats */
export async function getPlayerStats(pid) {
    const res1 = await query('SELECT * FROM Player WHERE pid = $1', [pid]);
    const res2 = await query(`
        SELECT assists, points, games, season, abbrev, tname 
        FROM Player 
        NATURAL JOIN PlayerStats 
        NATURAL JOIN Team
        WHERE pid = $1
        ORDER BY season DESC`, [pid]);
    return {
        player: res1.rows[0],
        stats: res2.rows,
    }
}

/*  Gets Team Stats */
export async function getTeamStats(abbrev) {
    const res1 = await query('SELECT * FROM Team WHERE abbrev LIKE $1', [abbrev]);
    const res2 = await query(`
        SELECT wins, losses, season
        FROM TeamStats
        WHERE abbrev LIKE $1
        ORDER BY season DESC`, [abbrev]);
    return {
        team: res1.rows[0],
        stats: res2.rows,
    }
}

/*  Gets All Players Stats */
export async function getAllPlayerStats() {
    const res = await query(`
        SELECT pid, firstName || ' ' || lastName AS name,
        ROUND(SUM(assists)) AS asts,
        ROUND(SUM(rebounds)) AS trbs, 
        ROUND(SUM(points)) AS pts,
        ROUND(SUM(games)) AS games,
        ROUND(COUNT(season)) AS seasons
        FROM Player NATURAL JOIN PlayerStats
        GROUP BY pid, firstName, lastName`);
    return res.rows
}

/*  Gets All Teams Stats */
export async function getAllTeamStats() {
    const res = await query(`
        SELECT abbrev, tname,
        ROUND(AVG(wins)) AS wins,
        ROUND(AVG(losses)) AS losses,
        COUNT(season) AS seasons
        FROM Team NATURAL JOIN TeamStats
        GROUP BY abbrev, tname`);
    return res.rows
}
