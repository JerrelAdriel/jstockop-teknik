const { takenService, takenUpdateService, itemService } = require("../../services")
const { takenHelper } = require("../../helpers")
class itemTakenController{
    createTaken = async(req,res,next) =>{
        try {
            const user_id = req.user.rows[0].id
            const taken = req.body
            // let takens;
            // let newAmount;
            // let newAmountItem;
            // let status;
            const item_recent = await takenHelper.reduceRecent(taken.item_id, taken.amount)
            if (item_recent === false){
                res.status(500).json({
                    status: 'Cannot Create taken',
                    message: 'Item Empty'
                })
                return
            }
            // const checkItem = await takenHelper.checkAlreadyTaken(user_id, taken.item_id, taken.location)
            // if(checkItem == true){
            //     const newAmountUpdate = await takenHelper.addAmountUpdateTaken(user_id,taken.item_id,taken.amount)
            //     newAmount = await takenHelper.addAmountTaken(user_id,taken.item_id,taken.amount)
            //     console.log(newAmount);
            //     takens =  await takenService.updateTaken(user_id,taken.item_id,newAmountUpdate,newAmount)
            //     status = "Ditambahkan Dari Pengambilan Sebelumnya"
            // }
            // else{
            const newAmount = taken.amount
                // newAmount = takenHelper.addAmountTakenItem(taken.item_id,taken.amount)
            const takens = await takenService.create(user_id,taken)
            const status = "Pengambilan Baru"
            // }
            const newTakenItem = await takenHelper.updateAddTakenItem(taken.item_id,taken.amount)
            const updateItem = await itemService.updateItemRecentTaken(taken.item_id, item_recent, newTakenItem)
            const takenupdate = await takenUpdateService.createTaken(user_id,taken, newAmount,status)

            res.status(201).json({
                    status: 'taken Created',
                    data_item: updateItem.rows,
                    data_taken_created: takens.rows,
                    data_taken_update_created: takenupdate.rows
                })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create taken'
            });
        }
    }

    updateAddTaken = async(req,res,next) => {
        try {
            const user_id = req.user.rows[0].id
            const taken = req.body
            const taken_id = req.params.id
            const status = "Ditambahkan Dari Pengambilan Sebelumnya"
            const item_recent = await takenHelper.reduceRecent(taken.item_id, taken.amount)
            if (item_recent === false){
                res.status(500).json({
                    status: 'Cannot Create taken',
                    message: 'Item Empty'
                })
                return
            }
            const newAmountUpdate = await takenHelper.addAmountUpdateTaken(taken_id,user_id,taken.item_id,taken.amount)
            const newAmount = await takenHelper.addAmountTaken(taken_id,user_id,taken.item_id,taken.amount)
            const takens =  await takenService.updateTaken(taken_id,user_id,taken.item_id,newAmountUpdate,newAmount)
            const newTakenItem = await takenHelper.updateAddTakenItem(taken.item_id,taken.amount)
            const updateItem = await itemService.updateItemRecentTaken(taken.item_id, item_recent, newTakenItem)
            const takenupdate = await takenUpdateService.createTaken(user_id, taken, newAmount, status)

            res.status(200).json({
                status: "Success Update taken",
                data_taken: takens.rows,
                data_item_updated: updateItem.rows,
                taken_updated:takenupdate.rows
            })
        } catch (error) {
            res.status(500).json({
                error:error.message,
                message: 'Cannot Update Add taken'
            })
        }
    }

    updateReduceTaken = async(req,res,next) => {
        try {
            const user_id = req.user.rows[0].id
            const taken = req.body
            const taken_id = req.params.id
            const status = "Dikembalikan Sebagian"
            const item_recent = await takenHelper.addRecent(taken.item_id,taken.amount)
            const newAmount = await takenHelper.reduceAmountTaken(taken_id,user_id,taken.item_id,taken.amount)
            const newReturnAmount = await takenHelper.addReturnAmountTaken(taken_id,user_id,taken.item_id,taken.amount)
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
                    message: 'You Cannot Giving Back Items More Than You Taken'
                })
                return
            }
            if(newAmount === 0){
                const takens =  await takenService.updateReduceTakenById(taken_id,user_id,taken.item_id,newAmount, newReturnAmount)
                if(takens.rows[0] == undefined || takens.rows[0] == ""){
                    res.status(500).json({
                        status: 'Error When Update',
                        message: 'Something Wrong'
                    })
                    return
                }
                const status = "Dikembalikan Seluruhnya"
                const newTakenItem = await takenHelper.updateReduceTakenItem(taken.item_id,taken.amount)
                const updateItem = await itemService.updateItemRecentTaken(taken.item_id, item_recent, newTakenItem)
                // const takenupdate = await takenUpdateService.updateReduceTaken(user_id, taken, takens.rows[0].unit, takens.rows[0].location, takens.rows[0].return_amount)
                const takenreturnupdate = await takenUpdateService.updateReturnTaken(user_id, taken, takens.rows[0].unit, takens.rows[0].location, takens.rows[0].return_amount, status, takens.rows[0].taken_time)
                const deletetaken = await takenService.deleteById(taken_id,user_id)
                
                res.status(200).json({
                    status: "Success Give Back All takens",
                    data_taken_deleted: deletetaken.rows,
                    data_item_updated: updateItem.rows,
                    // data_taken_updated: takenupdate.rows,
                    data_taken_return: takenreturnupdate.rows
                })
                return
            }
            const takens =  await takenService.updateReduceTakenById(taken_id,user_id,taken.item_id,newAmount, newReturnAmount)
            if(takens.rows[0] == undefined || takens.rows[0] == ""){
                res.status(500).json({
                    status: 'Error When Update',
                    message: 'Something Wrong'
                })
                return
            }
            const newTakenItem = await takenHelper.updateReduceTakenItem(taken.item_id,taken.amount)
            const updateItem = await itemService.updateItemRecentTaken(taken.item_id, item_recent, newTakenItem)
            // const takenupdate = await takenUpdateService.updateReduceTaken(user_id, taken, takens.rows[0].unit, takens.rows[0].location, takens.rows[0].return_amount)
            const takenreturnupdate = await takenUpdateService.updateReturnTaken(user_id, taken, takens.rows[0].unit, takens.rows[0].location, takens.rows[0].return_amount, status, takens.rows[0].taken_time)
            res.status(200).json({
                status: "Success Give Back takens",
                data_taken:takens.rows,
                data_item_updated: updateItem.rows,
                // data_taken_updated: takenupdate.rows,
                data_taken_return: takenreturnupdate.rows
            })
        } catch (error) {
            res.status(500).json({
                error:error.message,
                message: 'Cannot Update Reduce taken'
            })
        }
    }

    updateFinishedTaken = async(req,res,next) =>{
        try {
            const user_id = req.user.rows[0].id
            const taken_id = req.params.id
            const status_user = req.body.status_user
            const takens = await takenService.updateFinishedTaken(taken_id,user_id,status_user)
            
            res.status(200).json({
                    status: 'Success Finish Taken, Wait For Approve',
                    data_finishedtaken_created: takens.rows,
                })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Update Finished Taken To Approve'
            });
        }
    }

    finishedTaken = async(req,res,next) => {
        try {
            const taken_id = req.params.id
            const user_id = req.user.rows[0].id

            const taken = await takenService.getTakenById(taken_id,user_id)
            if(taken.rows[0] === null || taken.rows[0] === undefined){
                res.status(500).json({
                    status:"Error Delete Taken",
                    message: 'Cannot Delete Taken By Id'
                })
                return
            }
            const finished = "Finished"
            const finished_taken = await takenService.addFinishedTaken(taken.rows[0],finished)

            const deleteTaken = await takenService.deleteById(taken_id, user_id)

            res.status(200).json({
                status: "Success Taken",
                data_taken:taken.rows,
                data_finished: finished_taken.rows,
                data_taken_deleted: deleteTaken.rows
            })

        } catch (error) {
            res.status(500).json({
                error:error.message,
                message: 'Cannot Delete'
            })
        }
    }

    getTakenById = async(req,res,next) => {
        try {
            const id = req.params.id
            const user_id = req.user.rows[0].id

            const taken = await takenService.getTakenById(id, user_id)
            if(taken.rows[0] === null || taken.rows[0] === undefined){
                res.status(500).json({
                    status:"Error get By ID",
                    message: 'Cannot Get taken By Id'
                })
                return
            }
            res.status(200).json({
                status: "Success Get taken",
                data_taken: taken.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get taken By Id'
            })
        }
    }

    getAllTaken = async(req,res,next) =>{
        try {
            const takens = await takenService.getAll()
            if (takens.rows[0] === null || takens.rows[0] === undefined || takens.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_takens: takens.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getAllFinishedTaken = async(req,res,next) =>{
        try {
            const takens = await takenService.getAllFinishedTaken()
            if (takens.rows[0] === null || takens.rows[0] === undefined || takens.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_takens: takens.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getAllFinishedTakenByDate = async(req,res,next) =>{
        try {
            const {start_date,end_date} = req.query
            const startDate = await takenHelper.startDate(start_date);
            const endDate = await takenHelper.endDate(end_date)
            
            const takens = await takenService.getAllFinishedTakenByDate(startDate,endDate)
            
            if (takens.rows[0] === null || takens.rows[0] === undefined || takens.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_takens: takens.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getAllTakenUpdate = async(req,res,next) =>{
        try {
            const takens = await takenUpdateService.getAll()
            if (takens.rows[0] === null || takens.rows[0] === undefined || takens.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_takens: takens.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getTakenUser = async(req,res,next) => {
        try {
            const user_id = req.user.rows[0].id 
            const takens = await takenService.getTakenUser(user_id)
            if (takens.rows[0] === null || takens.rows[0] === undefined || takens.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "success",
                data_takens: takens.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getTakenUserByAdmin = async(req,res,next) => {
        try {
            const user_id = req.body.user_id

            const takens = await takenService.getTakenUser(user_id)
            if (takens.rows[0] === null || takens.rows[0] === undefined || takens.rows[0] === "") {
                res.status(204).json({
                    status: "Success",
                    message: "No Content"
                })
                return
            }
            res.status(200).json({
                status: "Success Get taken",
                data_taken: takens.rows,
                username: takens.rows[0].users.username
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    deleteTaken = async(req,res,next) =>{
        try {
            const id = req.params.id
            const user_id = req.user.rows[0].id

            const deletetaken = await takenService.deleteById(id, user_id)

            res.status(200).json({
                status: "Success Delete",
                data_takens: deletetaken
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Delete taken'
            })
        }
    }
    createFinishedTaken = async(req,res,next) =>{
        try {
            const taken = req.body
            const takens = await takenService.createFinishedTaken(taken)
            const deleteTakens = await takenService.deleteByIdFinished(taken.id)
            res.status(201).json({
                    status: 'Loan Finished Created',
                    data_finishedtaken_created: takens.rows,
                    data_deletedtaken_created: deleteTakens.rows,
                })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create Finished Loan'
            });
        }
    }
}

module.exports = itemTakenController