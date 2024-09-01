const db = require("../config/db.config")

async function create(user_id, username, password, role){  
    const createUserUpdate = await db.query(`INSERT INTO user_update (user_id, username, password, role, created_at) VALUES ($1,$2,$3,$4,current_timestamp) RETURNING *`,
    [user_id, username, password, role]);
    return createUserUpdate
} 

async function getAll(){
    const getAllUserUpdate = await db.query(`SELECT user_update.*, json_agg(row_to_json(users)) As users FROM user_update LEFT JOIN users ON user_update.user_id = users.id 
    GROUP BY user_update.id, user_update.user_id ORDER BY user_update.id asc`);
    return getAllUserUpdate
}

async function getById(id){
    const getUserUpdateById = await db.query(`SELECT user_update.*, json_agg(row_to_json(users)) As users FROM user_update LEFT JOIN users ON user_update.user_id = users.id 
    WHERE user_update.id = $1 GROUP BY user_update.id, user_update.user_id ORDER BY user_update.id asc`, [id]);
    return getUserUpdateById
} 


module.exports = {
    create,
    getAll,
    getById
}