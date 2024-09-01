const { itemHelper } = require("../../helpers")
const { itemService, itemUpdateService, loanUpdateService } = require("../../services")

class itemController {
    createItems = async(req,res,next) => {
        try {
            const item = req.body
            const total_recent = req.body.init_amount
            const items = await itemService.create(item, total_recent)

            const itemupdate = await itemUpdateService.create(items.rows[0].id, item.name, item.specification, item.merk, item.unit, total_recent)

            res.status(201).json({
                status: 'Item Created',
                data_created: items.rows,
                dataupdate_create: itemupdate.rows
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create Item'
            });
        }
    }

    updateItems = async(req,res,next) => {
        try {
            const id = req.params.id

            const item = req.body
            
            // const updatetotalrecent = await loanHelper.updateRecentItem(id, item.init_amount)
            // console.log(updatetotalrecent);
            // const init_amount = await itemService.getById(id)
            // if (init_amount.rows[0].total_recent){

            // }
            const items = await itemService.update(id,item)

            const itemupdate = await itemUpdateService.create(items.rows[0].id, item.name, item.specification, item.merk, item.unit, item.total_recent)

            res.status(200).json({
                status: 'Update Success',
                data_updated: items.rows,
                dataupdate_create: itemupdate.rows
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Update Items'
            });
        }
    }

    getAllItems =  async(req,res,next) => {
        try {
            const items = await itemService.getAll()
            const itemslowstock = await itemService.getAllLowStock()
            if(items.rows == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content',
                    data_items: []
                })
                return;
            }
            res.status(200).json({
                status: "Success Get All Items",
                data_items: items.rows,
                data_items_low: itemslowstock.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    getItemsById =  async(req,res,next) =>{
        try {
            const id = req.params.id

            const items = await itemService.getById(id)

            if(items.rows == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content',
                })
                return;
            }
            res.status(200).json({
                status: "Success Get Item",
                data_items: items.rows
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get Data By Id'
            })
        }
    }

    deleteItems = async(req,res,next) =>{
        try {
            const item_id = req.params.id

            const deleteItems = await itemService.deleteById(item_id)

            res.status(200).json({
                status: "Delete Items Success",
                data_deleted: deleteItems.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Delete Items'
            })
        }
    }

    TesAnything = async(req,res,next) =>{
       try {
        // const item_id = req.body.item_id
        // const tes = await itemService.getRecentItem(item_id)

        const param = req.params.id
        const tes = await loanUpdateService.deleteById(param)
        // res.status(200).json({
        //     status: "Success Get Data",
        //     total_recent: tes.rows[0].total_recent
        // })
        res.status(200).json({
            status: "Success",
            total_recent: tes.rows[0].total_recent
        })    
       } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Gagal '
        })
       }
    }
}

module.exports = itemController