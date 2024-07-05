const User = require('../models/User.js');
const Movie = require('../models/Movie.js');
const Producer = require('../models/Producer.js');
const Actor = require('../models/Actor.js'); 


//creating a new user (TESTED)
const createUser = async(req,res)=>{

    const newUser = new User(req.body)

    try{

            const savedUser = await newUser.save();

        res.status(200).json({success:true, message: 'Succesfully created', data:savedUser});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}


//updating a user (TESTED)
const updateUser = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedUser});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}


//deleting a user (TESTED)
const deleteUser = async (req,res)=>{

    const id= req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Succesfully deleted', data:deletedUser})

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to delete please try again!!'});
    }
}

//getSingle  user (TESTED)
const singleUser = async (req,res)=>{

    const id= req.params.id;

        
        try{

            const user = await User.findById(id).populate({path:'actors' , model:'Actor'}).populate({path:'movies' , model:'Movie'}).populate({path:'producers' , model:'Producer'});
    
            res.status(200).json({success:true, message: 'Succesfully shown', data: user});
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }       
}

//getAll  users (TESTED)
const allUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({success:true, message: 'Succesfully shown', data: users});
    }catch(err){
        res.status(404).json({success:false, message: 'Failed to show please try again!!'});
    }
}



module.exports = {createUser,updateUser,deleteUser,singleUser,allUsers};