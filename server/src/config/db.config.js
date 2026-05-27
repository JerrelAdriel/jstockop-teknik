const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
    // user:"postgres",
    // password:"postgres",
    // host:"localhost",
    // port: 5432,
    // database: "teknikstockop"
    connectionString: process.env.POSTGRES_URL,
})

// pool.connect((err) =>{
//     if(err) throw err
//     console.log("Connect Successfully")
// })

// Transaction helper: executes a callback with a client, handles BEGIN/COMMIT/ROLLBACK
pool.transaction = async function(callback) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = pool
