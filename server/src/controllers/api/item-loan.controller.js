const { loanService, loanUpdateService, itemService } = require("../../services")
const { loanHelper } = require("../../helpers")
const db = require("../../config/db.config")
class itemLoanController{
    createLoan = async(req,res,next) =>{
        try {
            const user_id = req.user.rows[0].id
            const loan = req.body

            // Use a database transaction to prevent race conditions on stock
            let updateItem, loans;
            try {
                const txResult = await db.transaction(async (client) => {
                    // Lock the item row to prevent concurrent modifications (SELECT FOR UPDATE)
                    const itemRow = await client.query(
                        'SELECT total_recent, number_of_loan FROM items WHERE id = $1 FOR UPDATE',
                        [loan.item_id]
                    );
                    const currentRecent = itemRow.rows[0].total_recent;
                    const currentNumberOfLoan = itemRow.rows[0].number_of_loan;

                    if (currentRecent === 0 || currentRecent - parseInt(loan.amount) < 0) {
                        const err = new Error('Item Empty');
                        err.code = 'ITEM_EMPTY';
                        throw err;
                    }

                    const item_recent = currentRecent - parseInt(loan.amount);
                    const newLoanItem = currentNumberOfLoan + parseInt(loan.amount);

                    // Insert the loan record
                    const return_amount = 0;
                    const loansResult = await client.query(
                        `INSERT INTO loans (user_id, item_id, amount, amount_recent, unit, location, return_amount, status_user, loan_time, created_at, updated_at)
                        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,current_timestamp,current_timestamp,current_timestamp) RETURNING *`,
                        [user_id, loan.item_id, loan.amount, loan.amount, loan.unit, loan.location, return_amount, false]
                    );

                    // Update item stock and loan count atomically
                    const updateItemResult = await client.query(
                        'UPDATE items SET total_recent = $1, number_of_loan = $2, updated_at = current_timestamp WHERE id = $3 RETURNING *',
                        [item_recent, newLoanItem, loan.item_id]
                    );

                    return { updateItem: updateItemResult, loans: loansResult };
                });
                updateItem = txResult.updateItem;
                loans = txResult.loans;
            } catch (txError) {
                if (txError.code === 'ITEM_EMPTY') {
                    res.status(500).json({
                        status: 'Cannot Create Loan',
                        message: 'Item Empty'
                    })
                    return
                }
                throw txError;
            }

            // Audit log (outside transaction - non-critical)
            const newAmount = loan.amount
            const status = "Peminjaman Baru"
            const loanupdate = await loanUpdateService.createLoan(user_id, loan, newAmount, status)

            res.status(201).json({
                    status: 'Loan Created',
                    data_item: updateItem.rows,
                    data_loan_created: loans.rows,
                    data_loan_update_created: loanupdate.rows
                })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create Loan'
            });
        }
    }
    updateAddLoan = async(req,res,next) => {
        try {
            const user_id = req.user.rows[0].id
            const loan = req.body
            const loan_id = req.params.id
            const status = "Ditambahkan Dari Peminjaman Sebelumnya"
            const item_recent = await loanHelper.reduceRecent(loan.item_id, loan.amount)
            
            if (item_recent === false){
                res.status(500).json({
                    status: 'Cannot Create Loan',
                    message: 'Item Empty'
                })
                return
            }
            
            const status_user = false
            const newAmountUpdate = await loanHelper.addAmountUpdateLoan(loan_id,user_id,loan.item_id,loan.amount)
            const newAmount = await loanHelper.addAmountLoan(loan_id,user_id,loan.item_id,loan.amount)
            const newLoanItem = await loanHelper.updateAddLoanItem(loan.item_id,loan.amount)
            const loans =  await loanService.updateLoan(loan_id,user_id,loan.item_id,newAmountUpdate,newAmount,status_user)
            
            const updateItem = await itemService.updateItemRecentLoan(loan.item_id, item_recent, newLoanItem)
            const loanupdate = await loanUpdateService.createLoan(user_id,loan,newAmount, status)

            res.status(200).json({
                status: "Success Update Loan",
                data_loan: loans.rows,
                data_item_updated: updateItem.rows,
                loan_updated:loanupdate.rows
            })
        } catch (error) {
            res.status(500).json({
                error:error.message,
                message: 'Cannot Update Add Loan'
            })
        }
    }

    updateReduceLoan = async(req,res,next) => {
        try {
            const user_id = req.user.rows[0].id
            const loan = req.body
            const loan_id = req.params.id
            const status = "Dikembalikan Sebagian"
            const item_recent = await loanHelper.addRecent(loan.item_id,loan.amount)
            const newAmount = await loanHelper.reduceAmountLoan(loan_id,user_id,loan.item_id,loan.amount)
            const newReturnAmount = await loanHelper.addReturnAmountLoan(loan_id,user_id,loan.item_id,loan.amount)
            if(newAmount === false){
                res.status(500).json({
                    status: 'Error When Update',
                    message: 'Something Wrong'
                })
                return
            }
            if(newAmount < 0){
                res.status(500).json({
                    status: 'You Stupid Idiot',
                    message: 'You Cannot Giving Back Items More Than You Loan'
                })
                return
            }
            if(newAmount === 0){
                const loans =  await loanService.updateReduceLoanById(loan_id,user_id,loan.item_id,newAmount, newReturnAmount)
                if(loans.rows[0] == undefined || loans.rows[0] == ""){
                    res.status(500).json({
                        status: 'Error When Update',
                        message: 'Something Wrong'
                    })
                    return
                }
                const status = "Dikembalikan Seluruhnya"
                const status_user = true
                // const newAmountItem = loanHelper.updateLoanItem(loan.item_id,newAmount)
                const newLoanItem = await loanHelper.updateReduceLoanItem(loan.item_id,loan.amount)
                const updateItem = await itemService.updateItemRecentLoan(loan.item_id, item_recent, newLoanItem)
                // const loanupdate = await loanService.updateLoan(user_id, loan, loans.rows[0].unit, loans.rows[0].location, loans.rows[0].return_amount)
                const loanreturnupdate = await loanUpdateService.updateReturnLoan(user_id, loan, loans.rows[0].unit, loans.rows[0].location, loans.rows[0].return_amount, status, loans.rows[0].loan_time)
                const loanupdate =  await loanService.updateReduceLoanById(loan_id,user_id,loan.item_id,newAmount, newReturnAmount, status_user )
                // const deleteLoan = await loanService.deleteById(loan_id,user_id)
                
                res.status(200).json({
                    status: "Success Give Back All Loans",
                    // data_loan_deleted: deleteLoan.rows,
                    data_item_updated: updateItem.rows,
                    data_loan_updated: loanupdate.rows,
                    data_loan_return: loanreturnupdate.rows
                })
                return
            }
            const status_user = false
            const loans =  await loanService.updateReduceLoanById(loan_id,user_id,loan.item_id,newAmount, newReturnAmount, status_user)
            if(loans.rows[0] == undefined || loans.rows[0] == ""){
                res.status(500).json({
                    status: 'Error When Update',
                    message: 'Something Wrong'
                })
                return
            }
            const newLoanItem = await loanHelper.updateReduceLoanItem(loan.item_id,loan.amount)
            const updateItem = await itemService.updateItemRecentLoan(loan.item_id, item_recent, newLoanItem)
            // const loanupdate = await loanUpdateService.updateReduceLoan(user_id, loan, loans.rows[0].unit, loans.rows[0].location, loans.rows[0].return_amount)
            const loanreturnupdate = await loanUpdateService.updateReturnLoan(user_id, loan, loans.rows[0].unit, loans.rows[0].location, loans.rows[0].return_amount, status,loans.rows[0].loan_time)
            res.status(200).json({
                status: "Success Give Back Loans",
                data_loan:loans.rows,
                data_item_updated: updateItem.rows,
                // data_loan_updated: loanupdate.rows,
                data_loan_return: loanreturnupdate.rows
            })
        } catch (error) {
            res.status(500).json({
                error:error.message,
                message: 'Cannot Update Reduce Loan'
            })
        }
    }

    getLoanById = async(req,res,next) => {
        try {
            const id = req.params.id
            const user_id = req.user.rows[0].id

            const loan = await loanService.getLoanById(id, user_id)
            if(loan.rows[0] === null || loan.rows[0] === undefined){
                res.status(500).json({
                    status:"Error get By ID",
                    message: 'Cannot Get loan By Id'
                })
                return
            }
            res.status(200).json({
                status: "Success Get Loan",
                data_loan: loan.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get Loan By Id'
            })
        }
    }

    getAllLoan = async(req,res,next) =>{
        try {
            const loans = await loanService.getAll()
            const loanstoday = await loanService.getAllLoanToday()
            if (loans.rows[0] === null || loans.rows[0] === undefined || loans.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_loans: loans.rows,
                data_loans_today: loanstoday.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getAllLoanUpdate = async(req,res,next) =>{
        try {
            const loans = await loanUpdateService.getAll()
            if (loans.rows[0] === null || loans.rows[0] === undefined || loans.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_loans: loans.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getAllFinishedLoan = async(req,res,next) =>{
        try {
            const loans = await loanService.getAllFinishedLoan()
            if (loans.rows[0] === null || loans.rows[0] === undefined || loans.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_loans: loans.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }
    getAllFinishedLoanByDate = async(req,res,next) =>{
        try {
            const {start_date,end_date} = req.query
            const startDate = await loanHelper.startDate(start_date);
            const endDate = await loanHelper.endDate(end_date)
            
            const loans = await loanService.getAllFinishedLoanByDate(startDate,endDate)
            
            if (loans.rows[0] === null || loans.rows[0] === undefined || loans.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_loans: loans.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getLoanUser = async(req,res,next) => {
        try {
            const user_id = req.user.rows[0].id 
            const loans = await loanService.getLoanUser(user_id)

            if (loans.rows[0] === null || loans.rows[0] === undefined || loans.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_loans: loans.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getLoanUserByAdmin = async(req,res,next) => {
        try {
            const user_id = req.body.user_id

            const loans = await loanService.getLoanUser(user_id)
            if (loans.rows[0] === null || loans.rows[0] === undefined || loans.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "Success Get Loan",
                data_loan: loans.rows,
                username: loans.rows[0].users.username
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    deleteLoan = async(req,res,next) =>{
        try {
            const id = req.params.id
            const user_id = req.user.rows[0].id

            const deleteLoan = await loanService.deleteById(id, user_id)

            res.status(200).json({
                status: "Success Delete",
                data_loans: deleteLoan.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Delete Loan'
            })
        }
    }

    createFinishedLoan = async(req,res,next) =>{
        try {
            const loan = req.body
            const loans = await loanService.createFinishedLoan(loan)
            const deleteLoans = await loanService.deleteByIdFinished(loan.id)
            res.status(201).json({
                    status: 'Loan Finished Created',
                    data_finishedloan_created: loans.rows,
                    data_deletedloan_created: deleteLoans.rows,
                })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create Finished Loan'
            });
        }
    }
}

module.exports = itemLoanController