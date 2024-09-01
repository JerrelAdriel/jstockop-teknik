const express = require("express");
const router = express.Router()

const { authentication } = require("../middlewares")
const Authorization = new authentication()

const {
    userController,
    userUpdateController,
    itemController,
    itemUpdateController,
    itemLoanController,
    itemTakenController,
} = require("../controllers/api");

const UserController = new userController()
const UserUpdateController = new userUpdateController()
const ItemController = new itemController()
const ItemUpdateController = new itemUpdateController()
const ItemLoanController = new itemLoanController()
const ItemTakenController = new itemTakenController()

router.get("/",(req,res) => res.send("Server is running!"))
router.post("/createadmin/teknik/stockop", UserController.createAdmin)
router.post("/createuser", Authorization.checkAdmin, UserController.createUsers)
router.put("/updateuser/:id", Authorization.checkAdmin, UserController.updateUsers)
router.get("/getalluser", Authorization.checkAdmin, UserController.getAllUsers )
router.get("/getuser/:id", Authorization.checkAdmin, UserController.getUsersById)
router.get("/getuser", Authorization.checkAdmin, UserController.getUsersByUsernameOrRole)
router.get("/getrolestaff", Authorization.checkAdmin, UserController.getUserByRole)
router.get("/getcurrentuser", Authorization.checkToken, UserController.getCurrentUser)
router.delete("/deleteuser/:id", Authorization.checkAdmin, UserController.deleteUser)
router.post("/login", UserController.loginUser)
router.get("/getalllogin", Authorization.checkAdmin, UserController.getAllLogin)

router.get("/getalluserupdate", Authorization.checkAdmin, UserUpdateController.getAllUserUpdate)
router.get("/getuserupdate/:id", Authorization.checkAdmin, UserUpdateController.getUserUpdateById)

router.post("/createitem", Authorization.checkAdmin, ItemController.createItems)
router.put("/updateitem/:id", Authorization.checkAdmin, ItemController.updateItems)
router.get("/getallitem", Authorization.checkToken, ItemController.getAllItems)
router.get("/getitem/:id", Authorization.checkToken, ItemController.getItemsById)
router.delete("/deleteitem/:id", Authorization.checkAdmin, ItemController.deleteItems)

router.get("/getallitemupdate", Authorization.checkAdmin, ItemUpdateController.getAllItemUpdate)
router.get("/getitemupdate/:id", Authorization.checkAdmin, ItemUpdateController.getItemUpdateById)

router.post("/createloan", Authorization.checkToken, ItemLoanController.createLoan)
router.post("/createfinishedloan", Authorization.checkAdmin, ItemLoanController.createFinishedLoan)
router.put("/updateaddloan/:id", Authorization.checkToken, ItemLoanController.updateAddLoan)
router.put("/updatereduceloan/:id", Authorization.checkToken, ItemLoanController.updateReduceLoan)
router.get("/getallloan", Authorization.checkAdmin, ItemLoanController.getAllLoan)
router.get("/getallfinishedloan", Authorization.checkAdmin, ItemLoanController.getAllFinishedLoan)
router.get("/getallfinishedloanbydate", Authorization.checkAdmin, ItemLoanController.getAllFinishedLoanByDate)
router.get("/getallloanupdate", Authorization.checkAdmin, ItemLoanController.getAllLoanUpdate)
router.get("/getloanbyid/:id", Authorization.checkToken, ItemLoanController.getLoanById)
router.get("/getloanbyuser", Authorization.checkToken, ItemLoanController.getLoanUser) // User Get All His/Her Loan

router.get("/getloanuserbyadmin", Authorization.checkAdmin, ItemLoanController.getLoanUserByAdmin) // Admin Get All User Loan
router.delete("/deleteloan/:id", Authorization.checkToken, ItemLoanController.deleteLoan)

router.post("/createtaken", Authorization.checkToken, ItemTakenController.createTaken)
router.post("/createfinishedtaken", Authorization.checkAdmin, ItemTakenController.createFinishedTaken)
router.put("/updateaddtaken/:id", Authorization.checkToken, ItemTakenController.updateAddTaken)
router.put("/updatereducetaken/:id", Authorization.checkToken, ItemTakenController.updateReduceTaken)
router.get("/getalltaken", Authorization.checkAdmin, ItemTakenController.getAllTaken)
router.get("/getallfinishedtaken", Authorization.checkAdmin, ItemTakenController.getAllFinishedTaken)
router.get("/getallfinishedtakenbydate", Authorization.checkAdmin, ItemTakenController.getAllFinishedTakenByDate)
router.get("/getalltakenupdate", Authorization.checkAdmin, ItemTakenController.getAllTakenUpdate)
router.get("/gettakenbyid/:id", Authorization.checkToken, ItemTakenController.getTakenById)
router.get("/gettakenbyuser", Authorization.checkToken, ItemTakenController.getTakenUser) // User Get All His/Her Taken
router.get("/gettakenuserbyadmin", Authorization.checkAdmin, ItemTakenController.getTakenUserByAdmin) // Admin Get All User Taken
router.delete("/deletetaken/:id", Authorization.checkToken, ItemTakenController.deleteTaken)
router.put("/updatefinishedtaken/:id", Authorization.checkToken, ItemTakenController.updateFinishedTaken)
router.delete("/finishedtaken/:id", Authorization.checkToken, ItemTakenController.finishedTaken)

router.get("/getdata", ItemController.TesAnything)
router.delete("/deleteall/:id", ItemController.TesAnything)

module.exports = router