import User from '../models/user.model.js'
import bycryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async(req,res,next) =>{
    console.log("entered")
    const {username,email,password} = req.body;
    const hashedpassword = bycryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedpassword});
    try{
    await newUser.save()
    res.status(201).json({message:"user created succefully"})
    }catch(error){
        next(error) 
    }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Signin attempt:', req.body);
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }

    const validpassword = bycryptjs.compareSync(password, validUser.password);
    if (!validpassword) return next(errorHandler(401, 'wrong credentials'));

    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req,res)=>{
    res.clearCookie('access_token').status(200).json({message:'Signout succes'})
}



