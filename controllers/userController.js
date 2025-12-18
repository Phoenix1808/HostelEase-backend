const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

//@desc Register new User
//@route POST/api/users/register

const registerUser = async(req ,res)=>{
    try{
        const{ name,email,password,role} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "Mandatory Fields"})
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User Already Exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        const user = await User.create({
            name, email, password: hashedPass, role
        })
        res.status(201).json({
            _id: user.id,
            name : user.name,
            email : user.email,
            role : user.role
        })
    } catch(error){
        res.status(500).json({message: error.message})
    }
}


// @desc   Login user
// @route  POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {registerUser,loginUser}