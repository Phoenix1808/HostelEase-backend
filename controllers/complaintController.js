const Complaint = require("../models/complaintModel")

//@desc Create New COmplaint
//@route POST/api/complaints

const createCom = async(req , res )=>{
    try{
        const {roomNo, category} = (req.body)
        if(!roomNo || !category){
            return res.status(400).json({message : "Mandatory Fields"})
        }
        const complaint = await Complaint.create({
            user:req.user._id,
            studentName : req.user.name,
            roomNo, category
        })
        res.status(201).json(complaint)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//@desc Get All complaints
//@route GET/api/complaints
const getAllCom = async(req,res)=>{
    try{
        let complaints
           if(req.user.role === "Warden"){
            complaints = await Complaint.find().populate("user","name email")
           } else {
            complaints = await Complaint.find({user: req.user._id})
           }
           res.status(200).json(complaints)
    } catch(error) {
          res.status(500).json({"message": error.message})
    }
}

//@desc Get single Complaint
//@route GET/api/complaints/:id

const CombyID = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (
      req.user.role !== "warden" &&
      complaint.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied: You cannot view this complaint"
      });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ message: "Invalid complaint ID" });
  }
};


//@desc update complaint status
//@route PUT/api/complaints/:id

const UpdateCom = async(req,res)=>{
    try{
        const complaints = await Complaint.findById(req.params.id)
        if(!complaints){
            return res.status(404).json({message: "Complaint not found"})
        }
        complaints.status = req.body.status || complaints.status
        await complaints.save()
        res.status(200).json(complaints)

    } catch (error){
      res.status(400).json({message:  "Complaint can't be updated"})
    }
}

//@desc delete complaints
//@route DELETE/api/complaints/:id

const DelCom = async(req,res)=>{
    try{
        const complaints = await Complaint.findById(req.params.id)
        if(!complaints){
            return res.status(404).json({message: "Complain not found"})
        } 
        await complaints.deleteOne()
        res.status(200).json({message: "Complaint Deleted"})
    } catch (error) {
       res.status(400).json({message: error.message})
    }
}
module.exports = {createCom , getAllCom, CombyID , UpdateCom , DelCom}