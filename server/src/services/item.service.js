const db = require("../config/db.config")

async function create(item, total_recents){
    const createItems = await db.query(`INSERT INTO items (name, specification, merk, unit, init_amount, total_recent, number_of_taken, 
    number_of_loan, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp,current_timestamp) RETURNING * `,
    [item.name,item.specification,item.merk,item.unit,item.init_amount,total_recents,0,0])
    return createItems
}

async function update(id,item){
    const updateItems = await db.query(`UPDATE items SET name = $1, specification = $2, merk = $3, unit = $4, init_amount = $5, total_recent = $6, number_of_taken = $7, 
    number_of_loan = $8, updated_at = current_timestamp WHERE id = $9 RETURNING * `,
    [item.name,item.specification,item.merk,item.unit,item.init_amount,item.total_recent,item.number_of_taken,item.number_of_loan,id])
    return updateItems
}

async function updateItemRecentLoan(id, recent, number_of_loan){
    const updateItems = await db.query(`UPDATE items SET total_recent = $1, number_of_loan = $2, updated_at = current_timestamp WHERE id = $3 RETURNING *`,
    [recent,number_of_loan, id])
    return updateItems
}

async function updateItemRecentTaken(id, recent, number_of_taken){
    const updateItems = await db.query(`UPDATE items SET total_recent = $1, number_of_taken = $2, updated_at = current_timestamp WHERE id = $3 RETURNING *`,
    [recent,number_of_taken, id])
    return updateItems
}

async function getRecentItem(item_id){
    const recentItem =  await db.query(`SELECT total_recent FROM items WHERE id = $1`,[item_id])
    return recentItem
}

async function getNumberOfLoan(item_id){
    const recentItem =  await db.query(`SELECT number_of_loan FROM items WHERE id = $1`,[item_id])
    return recentItem
}

async function getNumberOfTaken(item_id){
    const recentItem =  await db.query(`SELECT number_of_taken FROM items WHERE id = $1`,[item_id])
    return recentItem
}

async function getInitAmount(item_id){
    const recentItem =  await db.query(`SELECT init_amount FROM items WHERE id = $1`,[item_id])
    return recentItem
}

async function getAll(){
    const getAllItems = await db.query(`SELECT * FROM items ORDER BY name asc`)
    return getAllItems
}

async function getAllLowStock(){
    const getAllItems = await db.query(`SELECT * FROM items WHERE total_recent <= 1 AND (total_recent+number_of_taken) <= init_amount OR (total_recent+number_of_taken) <= (init_amount - 2) ORDER BY name asc`)
    return getAllItems
}

async function getById(id){
    const getItemsById = await db.query(`SELECT * FROM items WHERE id = $1`,[id])
    return getItemsById
}

async function deleteById(id){
    const deleteItems = await db.query(`DELETE FROM items WHERE id = $1 RETURNING *`,[id])
    return deleteItems;
}

module.exports = {
    create,
    update,
    getAll,
    getAllLowStock,
    getById,
    getInitAmount,
    getNumberOfLoan,
    getNumberOfTaken,
    deleteById,
    getRecentItem,
    updateItemRecentLoan,
    updateItemRecentTaken
}