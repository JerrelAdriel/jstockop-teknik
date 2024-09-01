const { itemService, loanService } = require("../services")

async function addRecent(item_id, amount){
    const checkRecentItem = await itemService.getRecentItem(item_id)
    const addRecentItem = checkRecentItem.rows[0].total_recent + parseInt(amount)
    return addRecentItem
}

async function updateAddLoanItem(item_id,newAmount){
    const checkNumberOfLoan = await itemService.getNumberOfLoan(item_id)
    const addNumberOfLoan = checkNumberOfLoan.rows[0].number_of_loan + parseInt(newAmount)
    return addNumberOfLoan
}

async function updateReduceLoanItem(item_id,newAmount){
    const checkNumberOfLoan = await itemService.getNumberOfLoan(item_id)
    const reduceNumberOfLoan = checkNumberOfLoan.rows[0].number_of_loan - parseInt(newAmount)
    return reduceNumberOfLoan
}

async function reduceRecent(item_id, amount){
    const checkRecentItem = await itemService.getRecentItem(item_id)
    if (checkRecentItem.rows[0].total_recent === 0 || checkRecentItem.rows[0].total_recent-parseInt(amount) < 0){
        return false
    }
    else{
        const newRecent = checkRecentItem.rows[0].total_recent - parseInt(amount)
        return newRecent
    }
}

async function addAmountLoan(loan_id,user_id,item_id,amount){
    const amountBefore = await loanService.getAmountById(loan_id,user_id,item_id)
    const newAmount = amountBefore.rows[0].amount_recent + parseInt(amount)
    return newAmount
}

async function addAmountUpdateLoan(loan_id,user_id,item_id,amount){
    const amountBefore = await loanService.getAmountLoanById(loan_id,user_id,item_id)
    const newAmount = amountBefore.rows[0].amount + parseInt(amount)
    return newAmount
}

async function reduceAmountLoan(loan_id,user_id,item_id,amount){
    const amountBefore = await loanService.getAmountById(loan_id,user_id,item_id)
    // console.log(amountBefore.rows[0]);
    if (amountBefore.rows[0] === undefined) {
        return false
    }
    else{
        const newAmount = amountBefore.rows[0].amount_recent - parseInt(amount)
        return newAmount
    }
}

async function addReturnAmountLoan(loan_id,user_id,item_id,amount){
    const returnAmountBefore = await loanService.getReturnAmountById(loan_id,user_id,item_id)
    const newAmount = returnAmountBefore.rows[0].return_amount + parseInt(amount)
    return newAmount
}

async function checkAlreadyLoan(user_id, item_id, location){
    const checkAlreadyLoan = await loanService.checkAlreadyLoanById(user_id,item_id,location)
    if (checkAlreadyLoan.rows[0] == "" || checkAlreadyLoan.rows[0] == undefined ) {
        return false
    } else {
        return true
    }
}

async function startDate(start_date){
    if(start_date == "" || start_date == null || start_date == undefined){
        return "1999-12-31"
    }
    else{
        return start_date
    }
}

async function endDate(end_date){
    if(end_date == "" || end_date == null || end_date == undefined){
        return "9999-12-31"
    }
    else{
        return end_date
    }
}

module.exports = {
    checkAlreadyLoan,
    addAmountLoan,
    addAmountUpdateLoan,
    updateAddLoanItem,
    updateReduceLoanItem,
    reduceAmountLoan,
    addReturnAmountLoan,
    addRecent,
    reduceRecent,
    startDate,
    endDate
}