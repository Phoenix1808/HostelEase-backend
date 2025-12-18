const mongoose = require("mongoose")

const Comschema = new mongoose.Schema(
    {
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        studentName : {
            type: String,
            required : true
        },
        roomNo : {
            type: String,
            required : true
        },
        category : {
            type : String,
            required : true,
            enum : ["Water", "Electrician", "Cleaning" , "Carpenter", "Other"]
        },
        status:{
            type: String,
            enum : ["Pending" , "Resolved"],
        },
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Complaint", Comschema)