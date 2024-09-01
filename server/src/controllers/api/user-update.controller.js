const { userUpdateService } = require("../../services")
class userUpdateController {
    
    getAllUserUpdate =  async(req,res,next) =>{
        try {
            const users = await userUpdateService.getAll()
            if(users == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content',
                })
                return;
            }
            res.status(200).json({
                status: "success",
                data_users: users.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    } 

    getUserUpdateById =  async(req,res,next) =>{
        try {
            const id = req.params.id
            const users = await userUpdateService.getById(id)
            if(users == ""){
                res.status(409).json({
                    status: 'Error',
                    message: 'Invalid Params Id',
                })
                return;
            }
            res.status(200).json({
                status: "success",
                data_users: users.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get Data By Id'
            })
        }
    } 
}
module.exports = userUpdateController