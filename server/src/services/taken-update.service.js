const db = require("../config/db.config")

async function createTaken(user_id, takens, total_amount, status) {
    const createtaken = await db.query(`INSERT INTO taken_item (user_id, item_id, taken_amount, unit, location, total_taken, 
    status, taken_time, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,current_timestamp,current_timestamp) RETURNING *`,
    [user_id,takens.item_id,takens.amount,takens.unit,takens.location,total_amount,status]);
    return createtaken
}

async function updateTaken(user_id, takens, unit,location, loan_time, total_amount, status) {
    const updatetaken = await db.query(`INSERT INTO taken_item (user_id, item_id, taken_amount, unit, location, total_taken, 
    status, taken_time, created_at)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp) RETURNING *`,
    [user_id,takens.item_id,takens.amount,unit,location,total_amount,status,loan_time]);
    return updatetaken
}

async function updateReduceTaken(user_id, takens, unit,location, return_amount) {
    const updatetaken = await db.query(`INSERT INTO taken_item (user_id, item_id, amount, unit, location, taken_time, return_amount,return_time, created_at) 
    VALUES ($1,$2,$3,$4,$5,current_timestamp,$6,current_timestamp,current_timestamp) RETURNING *`,[user_id,takens.item_id,takens.amount,
    unit,location,return_amount]);
    return updatetaken
}

async function updateReturnTaken(user_id, takens, unit,location, return_amount, status, taken_time) {
    const updatetaken = await db.query(`INSERT INTO return_taken_item (user_id, item_id, return_amount, unit, location, 
    total_return_amount,status,taken_time,return_time,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp,current_timestamp)
    RETURNING *`,[user_id,takens.item_id,takens.amount,unit,location,return_amount,status,taken_time]);
    return updatetaken
}

async function getAll() {
    const getAlltaken = await db.query(`SELECT taken_item.*, row_to_json(users) As users, row_to_json(items) As items FROM taken_item LEFT JOIN 
    users ON taken_item.user_id = users.id LEFT JOIN items ON taken_item.item_id = items.id ORDER BY taken_item.taken_time desc`)
    return getAlltaken
} 

module.exports = {
    createTaken,
    updateTaken,
    updateReduceTaken,
    updateReturnTaken,
    getAll
}