const { itemService, takenService } = require("../services")

async function addRecent(item_id, amount){
    const checkRecentItem = await itemService.getRecentItem(item_id)
    const addRecentItem = checkRecentItem.rows[0].total_recent + parseInt(amount)
    return addRecentItem
}

async function updateAddTakenItem(item_id,newAmount){
    const checkNumberOfTaken = await itemService.getNumberOfTaken(item_id)
    const addNumberOfTaken = checkNumberOfTaken.rows[0].number_of_taken + parseInt(newAmount)
    return addNumberOfTaken
}

async function updateReduceTakenItem(item_id,newAmount){
    const checkNumberOfTaken = await itemService.getNumberOfTaken(item_id)
    const reduceNumberOfTaken = checkNumberOfTaken.rows[0].number_of_taken - parseInt(newAmount)
    return reduceNumberOfTaken
}

async function reduceRecent(item_id, amount){
    const checkRecentItem = await itemService.getRecentItem(item_id)
    if (checkRecentItem.rows[0].total_recent == 0 || checkRecentItem.rows[0].total_recent-amount < 0){
        return false
    }
    else{
        const newRecent = checkRecentItem.rows[0].total_recent - parseInt(amount)
        return newRecent
    }
}

async function addAmountTaken(taken_id,user_id,item_id,amount){
    const amountBefore = await takenService.getAmountById(taken_id,user_id,item_id)
    const newAmount = amountBefore.rows[0].amount_recent + parseInt(amount)
    return newAmount
}

async function addAmountTakenItem(item_id,amount){
    const amountBefore = await itemService.getNumberOfTaken(item_id)
    const newAmount = amountBefore.rows[0].number_of_taken + parseInt(amount)
    return newAmount
}

async function addAmountUpdateTaken(taken_id,user_id,item_id,amount){
    const amountBefore = await takenService.getAmountTakenById(taken_id,user_id,item_id)
    const newAmount = amountBefore.rows[0].amount + parseInt(amount)
    return newAmount
}

async function reduceAmountTaken(taken_id,user_id,item_id,amount){
    const amountBefore = await takenService.getAmountById(taken_id,user_id,item_id)
    if (amountBefore.rows[0] === undefined) {
        return false
    }
    else{
        const newAmount = amountBefore.rows[0].amount_recent - parseInt(amount)
        return newAmount
    }
}

async function addReturnAmountTaken(taken_id,user_id,item_id,amount){
    const returnAmountBefore = await takenService.getReturnAmountById(taken_id,user_id,item_id)
    const newAmount = returnAmountBefore.rows[0].return_amount + parseInt(amount)
    return newAmount
}

async function checkAlreadyTaken(user_id, item_id, location){
    const checkAlreadytaken = await takenService.checkAlreadyTakenById(user_id,item_id,location)
    if (checkAlreadytaken.rows[0] == "" || checkAlreadytaken.rows[0] == undefined ) {
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
    checkAlreadyTaken,
    addAmountTaken,
    addAmountUpdateTaken,
    reduceAmountTaken,
    updateAddTakenItem,
    updateReduceTakenItem,
    addReturnAmountTaken,
    addRecent,
    addAmountTakenItem,
    reduceRecent,
    startDate,
    endDate
}