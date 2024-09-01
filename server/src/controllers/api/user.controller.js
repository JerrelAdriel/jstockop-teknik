const { loginService,userService,userUpdateService } = require("../../services")
const { authenticationHelper } = require("../../helpers")
class userController {

    createAdmin = async(req,res,next) => {
        try {
            const username = req.body.username.toLowerCase()
            const password = await authenticationHelper.encryptedPassword(req.body.password)
            const role = req.body.role
            
            const userCheck = await authenticationHelper.checkUsername(username)
            if (userCheck){
                res.status(409).json({
                    status: 'Error Register',
                    message: 'Username Sudah Ada!'
                });
                return;
            }

            const users = await userService.create(username,password,role)

            const userupdate = await userUpdateService.create(users.rows[0].id, username,password,role)

            res.status(201).json({
                status: 'User Created',
                data_created: users.rows,
                dataupdate_create: userupdate.rows
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create Users'
            });
        }
    }

    createUsers = async(req,res,next) => {
        try {
            const username = req.body.username.toLowerCase()
            const password = await authenticationHelper.encryptedPassword(req.body.password)
            const role = req.body.role
            
            const userCheck = await authenticationHelper.checkUsername(username)
            if (userCheck){
                res.status(409).json({
                    status: 'Error Register',
                    message: 'Username Sudah Ada!'
                });
                return;
            }

            const users = await userService.create(username,password,role)

            const userupdate = await userUpdateService.create(users.rows[0].id, username,password,role)

            res.status(201).json({
                status: 'User Created',
                data_created: users.rows,
                dataupdate_create: userupdate.rows
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Create Users'
            });
        }
    }

    updateUsers = async(req,res,next) => {
        try {
            const id = req.params.id
            const username = req.body.username
            const role = req.body.role
            const password = await authenticationHelper.encryptedPassword(req.body.password)
            const users = await userService.update(id,username,password,role)

            const userupdate = await userUpdateService.create(users.rows[0].id,username,password,role)

            res.status(200).json({
                status: 'Update Success',
                data_updated: users.rows,
                dataupdate_create: userupdate.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Update Users'
            });
        }
    }
    
    getAllUsers =  async(req,res,next) =>{
        try {
            const users = await userService.getAll()
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

    getUsersById =  async(req,res,next) =>{
        try {
            const id = req.params.id
            const users = await userService.getById(id)
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

    getUsersByUsernameOrRole = async(req,res,next) =>{
        try {
            const username = req.query.username
            const role = req.query.role
            const user = await userService.getByUsernameOrRole(username,role)

            res.status(200).json({
                status: 'Success Get Data By Username',
                data_user: user.rows,
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                message: 'Error Get Data By Username'
            })
        }
    }

    getUserByRole = async(req,res,next) =>{
        try {
            const role = "Staff"
            const user = await userService.getByRole(role)

            res.status(200).json({
                status: 'Success Get Data By Username',
                data_users: user.rows,
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                message: 'Error Get Data By Username'
            })
        }
    }
    
    getCurrentUser = async(req,res,next) =>{
        try {
            const user = await userService.getById(req.user.rows[0].id)
            if(!user) {
                res.status(401).json({
                    message: 'User not found'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                data_user: user.rows[0],
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }   
    }

    loginUser = async(req,res,next) =>{
        try {
            const username = req.body.username.toLowerCase()
            const password = req.body.password
            const userCheck = await authenticationHelper.checkUsername(username)
            if (!userCheck){
                res.status(409).json({
                    status: 'Error Login',
                    message: 'Username Tidak Ditemukan!'
                });
                return;
            }

            const user = await userService.getByUsername(username)

            const isPasswordValid = await authenticationHelper.comparePassword(password, user.rows[0].password)

            if (!isPasswordValid){
                res.status(409).json({
                    status: 'Error Login',
                    message: 'Password Salah!   '
                });
                return;
            }

            const login = await loginService.login(user.rows[0].id)
            

            const payload = {
                id: user.rows[0].id,
                username: username,
                password: password,
                role: user.rows[0].role
            }

            const token = await authenticationHelper.createToken(payload);

            res.status(200).json({
                status: 'Success Login',
                data_user: user.rows[0],
                data_login: login.rows[0],
                data_token: token
            })

        } catch (error) {
            res.status(500).json({
                message: error.message,
                message: 'Something went wrong'
            })
        }
    }

    getAllLogin = async(req,res,next) =>{
        try {
            const logins = await loginService.getAll()
            if(logins == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content',
                })
                return;
            }
            res.status(200).json({
                status: "success",
                data_logins: logins.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Get All Data'
            })
        }
    }

    deleteUser = async(req,res,next) =>{
        try {
            const user_id = req.params.id

            const deleteUser = await userService.deleteById(user_id)

            res.status(200).json({
                status: "Delete User Success",
                data_deleted: deleteUser.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Delete User'
            })
        }
    }

    deleteAllUser = async(req,res,next) =>{
        try {
            const deleteUser = await userService.deleteAll()

            res.status(200).json({
                status: "Delete User Success",
                data_deleted: deleteUser.rows
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Cannot Delete User'
            })
        }
    }
}
module.exports = userController