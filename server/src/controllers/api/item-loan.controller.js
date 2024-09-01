const { loanService, loanUpdateService, itemService } = require("../../services")
const { loanHelper } = require("../../helpers")
class itemLoanController{
    createLoan = async(req,res,next) =>{
        try {
            const user_id = req.user.rows[0].id
            const loan = req.body
            // let newAmount;
            // let status;
            const item_recent = await loanHelper.reduceRecent(loan.item_id, loan.amount) 
            if (item_recent === false){
                res.status(500).json({
                    status: 'Cannot Create Loan',
                    message: 'Item Empty'
                })
                return
            }
            // const checkItem = await loanHelper.checkAlreadyLoan(user_id, loan.item_id, loan.location)
            // if(checkItem == true){
            //     const status_user = false
            //     const newAmountUpdate = await loanHelper.addAmountUpdateLoan(user_id,loan.item_id,loan.amount)
            //     newAmount = await loanHelper.addAmountLoan(user_id,loan.item_id,loan.amount)
            //     loans =  await loanService.updateLoan(user_id,loan.item_id,newAmountUpdate,newAmount,status_user)
            //     status = "Ditambahkan Dari Peminjaman Sebelumnya"
            // }
            // else{
            const newAmount = loan.amount
            const loans = await loanService.create(user_id,loan)
            const status = "Peminjaman Baru"
            // }
            const newLoanItem = await loanHelper.updateAddLoanItem(loan.item_id,loan.amount)
            const updateItem = await itemService.updateItemRecentLoan(loan.item_id, item_recent, newLoanItem)
            const loanupdate = await loanUpdateService.createLoan(user_id,loan,newAmount, status)

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