const userService = require("./user.service")
const userUpdateService = require("./user-update.service")
const itemService = require("./item.service")
const itemUpdateService = require("./item-update.service")
const loginService = require("./login.service")
const loanService = require("./loan.service")
const loanUpdateService = require("./loan-update.service")
const takenService = require("./taken.service")
const takenUpdateService = require("./taken-update.service")

module.exports = {
    userService,
    userUpdateService,
    itemService,
    itemUpdateService,
    loginService,
    loanService,
    loanUpdateService,
    takenService,
    takenUpdateService
}