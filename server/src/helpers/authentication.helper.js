const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { userService } = require("../services")

require("dotenv").config()

function encryptedPassword(password)
{
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            // console.log(password, '-<<-password', hash, '--hash');
            if(err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

function comparePassword(password, hash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
}

function createToken(user)
{
    return new Promise((resolve, reject) => {
        jwt.sign({user}, process.env.JWT_SIGNATURE_KEY, (err, token) => {

            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

async function checkUsername(username){
    const user = await userService.getByUsername(username)
    if(user.rows != ""){
        if(username == user.rows[0].username){
            return true
        }
        return
    }
    return false
}

module.exports = {
    encryptedPassword,
    comparePassword,
    verifyToken,
    createToken,
    checkUsername,
}