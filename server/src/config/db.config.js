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

module.exports = pool