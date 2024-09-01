const db = require("../config/db.config")

async function create(user_id, loans) {
    const return_amount = 0
    const createLoan = await db.query(`INSERT INTO loans (user_id, item_id, amount, amount_recent, unit, location, return_amount, status_user, loan_time, created_at, updated_at) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp,current_timestamp,current_timestamp) RETURNING *`,[user_id,loans.item_id,loans.amount,loans.amount,loans.unit,loans.location,return_amount,false])
    return createLoan
}

async function createFinishedLoan(loans) {
    const createLoan = await db.query(`INSERT INTO finished_loan_item (user_name, item_name, specification, amount, unit, location, return_amount, loan_time, return_time, created_at) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,current_timestamp) RETURNING *`,[loans.user_name,loans.item_name,loans.specification,loans.amount,loans.unit,loans.location,loans.returnAmount,loans.loanTime,loans.returnTime])
    return createLoan
}

async function updateLoan(loan_id,user_id,item_id,newamount,amount,status_user){
    const updateLoan =  await db.query(`UPDATE loans SET amount = $1, amount_recent = $2, status_user = $3, updated_at = current_timestamp WHERE id = $4 AND user_id = $5 AND item_id = $6 RETURNING *`,[newamount,amount,status_user,loan_id,user_id,item_id])
    return updateLoan
}

async function updateAddLoanById(loan_id,user_id,item_id,amount){
    const updateLoan =  await db.query(`UPDATE loans SET amount_recent = $1, updated_at = current_timestamp WHERE id = $2 AND user_id = $3 AND item_id = $4 RETURNING *`,[amount,loan_id,user_id,item_id])
    return updateLoan
}

async function updateReduceLoanById(loan_id,user_id,item_id,amount, return_amount, status_user){
    const updateLoan =  await db.query(`UPDATE loans SET amount_recent = $1, return_amount = $2, status_user = $3, return_time = current_timestamp, updated_at = current_timestamp WHERE id = $4 AND user_id = $5 AND item_id = $6 RETURNING *`,[amount,return_amount,status_user,loan_id,user_id,item_id])
    return updateLoan
}

async function checkAlreadyLoanById(user_id,item_id,location){
    const checkAlreadyLoanById = await db.query(`SELECT * FROM loans WHERE user_id = $1 AND item_id = $2 AND location = $3`,[user_id,item_id,location])
    return checkAlreadyLoanById
}

async function getReturnAmountById(loan_id,user_id,item_id){
    const returnAmountById = await db.query(`SELECT return_amount FROM loans WHERE id= $1 AND user_id = $2 AND item_id = $3`,[loan_id,user_id,item_id])
    return returnAmountById
}

async function getLoanById(id,user_id){
    const getLoanById = await db.query(`SELECT loans.*, row_to_json(users) As users, row_to_json(items) As items FROM loans 
    LEFT JOIN users ON loans.user_id = users.id LEFT JOIN items ON loans.item_id = items.id WHERE loans.id = $1 AND user_id = $2 
    ORDER BY loans.id asc`,[id,user_id])    
    return getLoanById
}
async function getLoanUser(user_id){
    const getAllLoanUserById = await db.query(`SELECT loans.*, row_to_json(users) As users, row_to_json(items) As items FROM loans 
    LEFT JOIN users ON loans.user_id = users.id LEFT JOIN items ON loans.item_id = items.id WHERE user_id = $1 ORDER BY loans.id asc`,[user_id])
    return getAllLoanUserById
}

async function getAll() {
    const getAllLoan = await db.query(`SELECT loans.*, row_to_json(users) As users, row_to_json(items) As items FROM loans LEFT JOIN 
    users ON loans.user_id = users.id LEFT JOIN items ON loans.item_id = items.id ORDER BY loans.status_user desc`)
    return getAllLoan
} 

async function getAllFinishedLoan() {
    const getAllLoan = await db.query(`SELECT * FROM finished_loan_item ORDER BY return_time desc`)
    return getAllLoan
} 

async function getAllLoanToday() {
    const getAllLoanToday = await db.query(`SELECT loans.*, row_to_json(users) As users, row_to_json(items) As items FROM loans LEFT JOIN 
    users ON loans.user_id = users.id LEFT JOIN items ON loans.item_id = items.id ORDER BY loans.id asc`)
    return getAllLoanToday
}

async function getAmountById(loan_id,user_id,item_id){
    const getAmountById = await db.query(`SELECT amount_recent FROM loans WHERE id = $1 AND user_id = $2 AND item_id = $3`,[loan_id,user_id,item_id])
    return getAmountById
}

async function getAmountLoanById(loan_id,user_id,item_id){
    const getAmountById = await db.query(`SELECT amount FROM loans WHERE id = $1 AND user_id = $2 AND item_id = $3`,[loan_id,user_id,item_id])
    return getAmountById
}

async function deleteById(id,user_id){
    const deleteLoan = await db.query(`DELETE FROM loans WHERE id = $1 AND user_id = $2 RETURNING *`,[id,user_id]);
    return deleteLoan
}

async function deleteByIdFinished(id){
    const deleteLoan = await db.query(`DELETE FROM loans WHERE id = $1 RETURNING *`,[id]);
    return deleteLoan
}

async function getAllAmountItemByUserId(user_id, item_id) {
    const getAllLoan = await db.query(`SELECT SUM(amount) FROM loans WHERE user_id = $1 AND item_id = $2 GROUP BY user_id,item_id`,[user_id,item_id])
    return getAllLoan.rows[0].sum
} 

async function getAllFinishedLoanByDate(start_date,end_date){
    const getAllLoan = await db.query(`SELECT user_name,item_name,specification,amount,unit,location,
    CONCAT(
    TO_CHAR(loan_time, 'DD'),
    '-',
    TO_CHAR(loan_time, 'MM'),
    '-',
    TO_CHAR(loan_time, 'YYYY'),
    ', ',
    TO_CHAR(loan_time, 'HH24:MI'),
    ' WIB'
  ) AS loan_time,
   CONCAT(
    TO_CHAR(return_time, 'DD'),
    '-',
    TO_CHAR(return_time, 'MM'),
    '-',
    TO_CHAR(return_time, 'YYYY'),
    ', ',
    TO_CHAR(return_time, 'HH24:MI'),
    ' WIB'
  ) AS return_time FROM finished_loan_item WHERE loan_time >= $1::date AND loan_time < $2::date + interval '1 day' ORDER BY loan_time desc`,[start_date,end_date]);
    return getAllLoan
}
// async function getAllFinishedLoanByDate(start_date,end_date){
//     const getAllLoan = await db.query(`SELECT user_name,item_name,specification,amount,unit,location,loan_time,return_time FROM finished_loan_item WHERE loan_time >= $1::date AND loan_time < $2::date + interval '1 day' ORDER BY loan_time desc`,[start_date,end_date]);
//     return getAllLoan
// }

module.exports = {
    create,
    createFinishedLoan,
    updateLoan,
    updateAddLoanById,
    updateReduceLoanById,
    checkAlreadyLoanById,
    getLoanById,
    getReturnAmountById,
    getAll,
    getAllFinishedLoan,
    getAllFinishedLoanByDate,
    getAllLoanToday,
    getLoanUser,
    getAmountById,
    getAmountLoanById,
    getAllAmountItemByUserId,
    deleteById,
    deleteByIdFinished
}