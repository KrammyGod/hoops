const { Pool } = require('pg');

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

// Use to end pool whenever server shuts down, is asynchronous.
// pool.end();
