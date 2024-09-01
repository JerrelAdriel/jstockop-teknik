const db = require("../config/db.config")

async function createLoan(user_id, loans, total_amount, status) {
    const createLoan = await db.query(`INSERT INTO loan_item (user_id, item_id, loan_amount, unit, location, total_loan, status, 
    loan_time, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,current_timestamp,current_timestamp) RETURNING *`,
    [user_id,loans.item_id,loans.amount,loans.unit,loans.location,total_amount,status]);
    return createLoan
}

async function updateLoan(user_id, loans, unit,location,loan_time, total_amount, status) {
    const updateLoan = await db.query(`INSERT INTO loan_item (user_id, item_id, loan_amount, unit, location, total_loan, status,
    loan_time, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp) RETURNING *`,
    [user_id,loans.item_id,loans.amount,unit,location,total_amount,status,loan_time]);
    return updateLoan
}

async function updateReduceLoan(user_id, loans, unit,location, return_amount) {
    const updateLoan = await db.query(`INSERT INTO loan_item (user_id, item_id, amount, unit, location, loan_time, 
    return_amount,return_time, created_at) VALUES ($1,$2,$3,$4,$5,current_timestamp,$6,current_timestamp,current_timestamp) 
    RETURNING *`,[user_id,loans.item_id,loans.amount,unit,location,return_amount]);
    return updateLoan
}

async function updateReturnLoan(user_id, loans, unit,location, return_amount, status, loan_time) {
    const updateLoan = await db.query(`INSERT INTO return_loan_item (user_id, item_id, return_amount, unit, location, 
    total_return_amount,status,loan_time,return_time,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp,current_timestamp) 
    RETURNING *`,[user_id,loans.item_id,loans.amount,unit,location,return_amount, status, loan_time]);
    return updateLoan
}

async function getAll() {
    const getAllLoan = await db.query(`SELECT loan_item.*, row_to_json(users) As users, row_to_json(items) As items FROM loan_item LEFT JOIN 
    users ON loan_item.user_id = users.id LEFT JOIN items ON loan_item.item_id = items.id ORDER BY loan_item.loan_time desc`)
    return getAllLoan
} 

async function deleteById(id){
    const deleteItems = await db.query(`DELETE FROM loan_item WHERE id = $1 RETURNING *`,[id])
    return deleteItems;
}


module.exports = {
    createLoan,
    updateLoan,
    updateReduceLoan,
    updateReturnLoan,
    getAll,
    deleteById
}