const db = require("../config/db.config")

async function create(user_id, takens) {
    const return_amount = 0
    const createtaken = await db.query(`INSERT INTO takens (user_id, item_id, amount, amount_recent, unit, location, return_amount, status_user,
    taken_time, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp,current_timestamp,current_timestamp) RETURNING *`,
    [user_id,takens.item_id,takens.amount,takens.amount,takens.unit,takens.location,return_amount,false])
    return createtaken
}

async function createFinishedTaken(takens) {
    const createTaken = await db.query(`INSERT INTO finished_taken_item (user_name, item_name, merk, specification, total_taken, unit, location, taken_time, created_at) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp) RETURNING *`,[takens.username,takens.itemname,takens.merk,takens.specification,takens.totaltaken,takens.unit,takens.location,takens.takenTime])
    return createTaken
}

async function updateTaken(taken_id,user_id,item_id,newamount,amount){
    const updatetaken =  await db.query(`UPDATE takens SET amount = $1, amount_recent = $2, updated_at = current_timestamp WHERE id = $3 AND user_id = $4 AND item_id = $5 RETURNING *`,[newamount,amount,taken_id,user_id,item_id])
    return updatetaken
}

async function updateAddTakenById(taken_id,user_id,item_id,amount){
    const updatetaken =  await db.query(`UPDATE takens SET amount_recent = $1, updated_at = current_timestamp WHERE id = $2 AND user_id = $3 AND item_id = $4 RETURNING *`,[amount,taken_id,user_id,item_id])
    return updatetaken
}

async function updateReduceTakenById(taken_id,user_id,item_id,amount, return_amount){
    const updatetaken =  await db.query(`UPDATE takens SET amount_recent = $1, return_amount = $2, return_time = current_timestamp, updated_at = current_timestamp WHERE id = $3 AND user_id = $4 AND item_id = $5 RETURNING *`,[amount,return_amount,taken_id,user_id,item_id])
    return updatetaken  
}

async function checkAlreadyTakenById(user_id,item_id,location){
    const checkAlreadytakenById = await db.query(`SELECT * FROM takens WHERE user_id = $1 AND item_id = $2 AND location = $3`,[user_id,item_id,location])
    return checkAlreadytakenById
}

async function getReturnAmountById(taken_id,user_id,item_id){
    const returnAmountById = await db.query(`SELECT return_amount FROM takens WHERE id = $1 AND user_id = $2 AND item_id = $3`,[taken_id,user_id,item_id])
    return returnAmountById
}

async function getTakenById(id,user_id){
    const gettakenById = await db.query(`SELECT takens.*, row_to_json(users) As users, row_to_json(items) As items FROM takens 
    LEFT JOIN users ON takens.user_id = users.id LEFT JOIN items ON takens.item_id = items.id WHERE takens.id = $1 AND user_id = $2 
    ORDER BY takens.id asc`,[id,user_id])    
    return gettakenById
}
async function getTakenUser(user_id){
    const getAlltakenUserById = await db.query(`SELECT takens.*, row_to_json(users) As users, row_to_json(items) As items FROM takens 
    LEFT JOIN users ON takens.user_id = users.id LEFT JOIN items ON takens.item_id = items.id WHERE user_id = $1 ORDER BY takens.id asc`,[user_id])
    return getAlltakenUserById
}

async function getAll() {
    const getAlltaken = await db.query(`SELECT takens.*, row_to_json(users) As users, row_to_json(items) As items FROM takens LEFT JOIN 
    users ON takens.user_id = users.id LEFT JOIN items ON takens.item_id = items.id ORDER BY takens.status_user desc`)
    return getAlltaken
} 

async function updateFinishedTaken(id,user_id,status_user){
    const updatetaken =  await db.query(`UPDATE takens SET status_user = $1, updated_at = current_timestamp WHERE id = $2 AND user_id = $3 RETURNING *`,[status_user,id,user_id])
    return updatetaken
}

async function getAllFinishedTaken() {
    const getAllTakens = await db.query(`SELECT * FROM finished_taken_item ORDER BY taken_time desc`)
    return getAllTakens
}

async function getAmountById(taken_id,user_id,item_id){
    const getAmountById = await db.query(`SELECT amount_recent FROM takens WHERE id = $1 AND user_id = $2 AND item_id = $3`,[taken_id,user_id,item_id])
    return getAmountById
}

async function getAmountTakenById(taken_id,user_id,item_id){
    const getAmountById = await db.query(`SELECT amount FROM takens WHERE id = $1 AND user_id = $2 AND item_id = $3`,[taken_id,user_id,item_id])
    return getAmountById
}

async function deleteById(id,user_id){
    const deletetaken = await db.query(`DELETE FROM takens WHERE id = $1 AND user_id = $2 RETURNING *`,[id,user_id]);
    return deletetaken
}

async function deleteByIdFinished(id){
    const deleteTaken = await db.query(`DELETE FROM takens WHERE id = $1 RETURNING *`,[id]);
    return deleteTaken
}

async function getAllAmountItemByUserId(user_id, item_id) {
    const getAlltaken = await db.query(`SELECT SUM(amount) FROM takens WHERE user_id = $1 AND item_id = $2 GROUP BY user_id,item_id`,[user_id,item_id])
    return getAlltaken.rows[0].sum
} 

async function addFinishedTaken(taken, finished_status){
    const finished_taken = await db.query(`INSERT INTO finished_taken_item (user_id, item_id, unit, location, total_taken,
    finished_status, taken_time, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,current_timestamp) RETURNING *`,[taken.user_id,taken.item_id,
    taken.unit, taken.location, taken.amount, finished_status, taken.taken_time])
    return finished_taken
}

async function getAllFinishedTakenByDate(start_date,end_date){
    const getAllTaken = await db.query(`SELECT user_name,item_name,merk,specification,total_taken,unit,location,
    CONCAT(
    TO_CHAR(taken_time, 'DD'),
    '-',
    TO_CHAR(taken_time, 'MM'),
    '-',
    TO_CHAR(taken_time, 'YYYY'),
    ', ',
    TO_CHAR(taken_time, 'HH24:MI'),
    ' WIB'
  ) AS taken_time FROM finished_taken_item WHERE taken_time >= $1::date AND taken_time < $2::date + interval '1 day' ORDER BY taken_time desc`,[start_date,end_date]);
    return getAllTaken
}

// async function getAllFinishedTakenByDate(start_date,end_date){
//     const getAllTaken = await db.query(`SELECT * FROM finished_taken_item WHERE taken_time >= $1::date AND taken_time < $2::date + interval '1 day' ORDER BY taken_time desc`,[start_date,end_date]);
//     return getAllTaken
// }

module.exports = {
    create,
    createFinishedTaken,
    updateTaken,
    updateAddTakenById,
    updateReduceTakenById,
    checkAlreadyTakenById,
    getTakenById,
    getReturnAmountById,
    getAll,
    getTakenUser,
    getAmountById,
    getAmountTakenById,
    getAllAmountItemByUserId,
    getAllFinishedTakenByDate,
    addFinishedTaken,
    updateFinishedTaken,
    getAllFinishedTaken,
    deleteById,
    deleteByIdFinished
}