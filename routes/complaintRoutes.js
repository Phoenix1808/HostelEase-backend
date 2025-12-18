const express = require("express")
const router = express.Router()
const {createCom, getAllCom,CombyID, UpdateCom, DelCom} = require("../controllers/complaintController")
const { protect, wardenOnly } = require("../middleware/authMiddleware")

//hosteler will create complaint
router.post("/", protect ,createCom)

//warden can view all complaints
router.get("/",protect ,getAllCom)

//Any Logged in user can view own complaint by id
router.get("/:id", protect, CombyID)

//warden only : Update Stauts
router.put("/:id",protect, wardenOnly , UpdateCom)

//warden ony : Delete complaint
router.delete("/:id", protect, wardenOnly, DelCom)


module.exports= router
