const db = require("../config/db.config")

async function create(item_id, name, specification, merk, unit, total_recent){  
    const createItemUpdate = await db.query(`INSERT INTO item_update (item_id, name, specification, merk, unit, total_recent, created_at) VALUES ($1,$2,$3,$4,$5,$6,current_timestamp) RETURNING *`,
    [item_id, name, specification, merk, unit, total_recent]);
    return createItemUpdate
} 

async function getAll(){
    const getAllItemUpdate = await db.query(`SELECT item_update.*, json_agg(row_to_json(items)) As items FROM item_update LEFT JOIN items ON item_update.item_id = items.id 
    GROUP BY item_update.id, item_update.item_id ORDER BY item_update.id asc`);
    return getAllItemUpdate
}

async function getById(id){
    const getItemUpdateById = await db.query(`SELECT item_update.*, json_agg(row_to_json(items)) As items FROM item_update LEFT JOIN items ON item_update.item_id = items.id 
    WHERE item_update.id = $1 GROUP BY item_update.id, item_update.item_id ORDER BY item_update.id asc`, [id]);
    return getItemUpdateById
}

module.exports = {
    create,
    getAll,
    getById
}