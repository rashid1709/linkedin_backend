const express = require('express');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

const {getToken} = require('../utils/helpers');

router.post('/register',async(req,res)=>{
    //this is the function to register user

    //Step 1
    // get the detail from req.body;
  
    const {firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({err:"Invalid Request"});
    }
//step 2: we wil check if a user with that email already exists
    const existingUser = await User.findOne({email:email});
    if(existingUser) {
        return res.status(402).json({err:"A use with this email already exists"});
    }

    //step 3: this is a legitimate user request. now we will create the user
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserDetails =
    {firstName,
    lastName,
    email,
    password: hashedPassword,
    };
    const newUser = await User.create(newUserDetails);

    //step 4 I can use new User to create a JWT

    const token = await getToken(email,newUser);
    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post('/login',async (req,res)=>{
    //Step 1 get the detail from req.body;
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(401).json({err:"Invalid email or password"});
    }

     //step 2:   verify that user exists with same email

    const userExits = await User.findOne({email:email});

    if(!userExits) {
        return res.status(401).json({err:"User not found with this email id"});
    }

   
    //step 3: verifrty password is correct

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid) {
        return res.status(401).json({err:"User not found with this email id"});
    }
    //step 4:  generate a token for that passord and return it
    const token = await getToken(email,newUser);
    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

})


module.exports = router;