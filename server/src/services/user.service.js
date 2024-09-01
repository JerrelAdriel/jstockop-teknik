const db = require("../config/db.config")

async function create(username,password,role){  
    const createUser = await db.query(`INSERT INTO users (username, password, role, created_at, updated_at) VALUES ($1,$2,$3,current_timestamp,current_timestamp) RETURNING *`,
    [username,password,role]);
    return createUser
} 

async function update(id, username, password, role){
    const updateUser = await db.query(`UPDATE users SET username = $1, password = $2, role = $3, updated_at = current_timestamp WHERE id = $4 RETURNING *`,
    [username, password, role, id]);
    return updateUser
} 

async function getAll(){
    const getAllUsers = await db.query(`SELECT * FROM users ORDER BY id asc`);
    return getAllUsers
}

async function getById(id){
    const getUsersById = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return getUsersById
} 

async function getByUsername(username){
    const getUserByUsername = await db.query(`SELECT * FROM users WHERE username = $1 ORDER BY id asc`, [username]);
    return getUserByUsername
}

async function getByUsernameOrRole(username,role){
    const getUserByUsername = await db.query(`SELECT * FROM users WHERE username = $1 or role = $2 ORDER BY id asc`, [username, role]);
    return getUserByUsername
}

async function getByRole(role){
    const getUserByRole = await db.query(`SELECT * FROM users WHERE role = $1 ORDER BY id asc`, [role]);
    return getUserByRole
}

async function getByIdAndAdmin(id){
    const getUsersByIdAndAdmin = await db.query(`SELECT * FROM users WHERE id = $1 AND role = 'admin' ORDER BY id asc`, [id]);
    return getUsersByIdAndAdmin
}

async function deleteById(id){
    const deleteUsers = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`,[id])
    return deleteUsers
}

async function deleteAll(){
    const deleteAll = await db.query(`DELETE FROM users RETURNING *`)
    return deleteAll
}

module.exports = {
    create,
    update,
    getAll,
    getById,
    getByUsername,
    getByUsernameOrRole,
    getByRole,      
    getByIdAndAdmin,
    deleteById,
    deleteAll
}