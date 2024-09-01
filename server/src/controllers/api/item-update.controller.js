const { itemUpdateService } = require("../../services")
class itemUpdateController {
    
    getAllItemUpdate =  async(req,res,next) =>{
        try {
            const items = await itemUpdateService.getAll()
            if(items == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content',
                })
                return;
            }
            res.status(200).json({
                status: "success",
                data_item_updated: items.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    } 

    getItemUpdateById =  async(req,res,next) =>{
        try {
            const id = req.params.id
            const items = await itemUpdateService.getById(id)
            if(items == ""){
                res.status(409).json({
                    status: 'Error',
                    message: 'Invalid Params Id',
                })
                return;
            }
            res.status(200).json({
                status: "success",
                data_id: id,
                data_item_updated: items.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get Data By Id'
            })
        }
    } 
}
module.exports = itemUpdateController