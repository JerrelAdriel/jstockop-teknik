const db = require("../config/db.config")

async function login(user_id){
    const login = await db.query(`INSERT INTO login (user_id, created_at) VALUES ($1,current_timestamp) RETURNING *`,
    [user_id]);
    return login
}

async function getAll(){
    const getAllLogin = await db.query(`SELECT login.*, row_to_json(users) As users FROM login LEFT JOIN users ON login.user_id
    = users.id ORDER BY login.id asc`)
    return getAllLogin
}

module.exports = {
    login,
    getAll
}