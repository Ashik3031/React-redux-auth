import { errorHandler } from "../utils/error.js"
import User from '../models/user.model.js'
import  bcryptjs from 'bcryptjs'

export const test = (req,res)=>{
    res.json({
        message:"api is working"
    })
}

export const updateuser = async(req,res,next)=>{
    console.log("enterd server")
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'you ca update only your account !'))
    }
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        console.log("enteredd",req.body.profilePicture)
        const updateuser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            {new:true}
        );
        const {password,...rest} = updateuser._doc;
        res.status(200).json(rest)
    }catch(error){
        console.error('Server error during update:', error);
        next(error)
    }
}


    export const userlist = async (req, res, next) => {
        try {
            
          const users = await User.find(); 
          console.log('Fetched Users:', users);
          res.json(users); 
        } catch (err) {
          res.status(500).json({ error: err.message }); 
        }
      };


      export const edituser = async(req,res,next)=>{
        console.log("enterd serverrrrrrrrrrrr")
        try{
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password,10)
            }
            console.log("enteredd",req.body.profilePicture)
            const updateuser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:{
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        profilePicture: req.body.profilePicture,
                    }
                },
                {new:true}
            );
            const {password,...rest} = updateuser._doc;
            res.status(200).json(rest)
        }catch(error){
            console.error('Server error during update:', error);
            next(error)
        }
    }
    
    export const deleteUser = async (req, res, next) => {
        try {

          console.log("Delete user request received for ID:", req.params.id);
          console.log("Request method:", req.method);
          
          const user = await User.findByIdAndDelete(req.params.id);
          if (!user) {
            console.log("User not found for ID:", req.params.id);
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          console.log("User deleted successfully:", user);
          res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
          console.error('Server error during delete:', error);
          next(error);
        }
      };


      
      export const searchUsers = async (req, res, next) => {
        const { query } = req.query;
        console.log(query) 
        try {
            const users = await User.find({
                $or: [
                    { username: { $regex: query, $options: 'i' } }, 
                    { email: { $regex: query, $options: 'i' } },    
                ]
            });
            res.json(users);
        } catch (error) {
            console.error('Error searching users:', error);
            res.status(500).json({ error: 'Server error' });
        }
    };
    