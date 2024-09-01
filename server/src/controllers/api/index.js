const userController = require("./user.controller")
const userUpdateController = require("./user-update.controller")
const itemController = require("./item.controller")
const itemUpdateController = require("./item-update.controller")
const itemLoanController = require("./item-loan.controller")
const itemTakenController = require("./item-taken.controller")

module.exports = {
    userController,
    userUpdateController,
    itemController,
    itemUpdateController,
    itemLoanController,
    itemTakenController
}