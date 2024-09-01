const jwt = require("jsonwebtoken")
const { userService } = require("../services")
const { authenticationHelper } = require("../helpers")
const { checkAdmin } = require("../helpers/authentication.helper")

require("dotenv").config()

class authorization {
    checkToken = async(req,res,next) => {
        try {
            const checkToken = req.headers.authorization;
            const token = checkToken.split("Bearer ")[1];
            const payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
            req.user = await userService.getById(payload.user.id);
            
            next();
        } catch (error) {
            res.status(401).json({
                status: "Error",
                message: "Unauthorized",
            })
        }
    }

    checkAdmin = async(req,res,next) => {
        try {
            const checkToken = req.headers.authorization;
            const token = checkToken.split("Bearer ")[1];
            const payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
            req.user = await userService.getByIdAndAdmin(payload.user.id);
            if (req.user.rows[0] == undefined){
                res.status(401).json({
                    status: "Error",
                    message: "Unauthorized",
                })
                return
            }

            next()
        } catch (error) {
            res.status(401).json({
                status: "Error",
                message: "Unauthorized",
            })
        }
    }
}


module.exports = authorization