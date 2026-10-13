import {User} from '../models/user.model.js';

const registerUser = async (req, res) => {
    try{
        const {username, password, email} = req.body;

        if(!username || !password || !email){
            return res.status(400).json({message: "All fields are important"});
        }
//   if user exits already
       const existing = await User.findOne({email:email.toLowerCase()});

       if(existing){
        return res.status(400).json({message: "User already exists"});
       } 

       const user = await User.create({
        username: username.toLowerCase(),
        password,
        email: email.toLowerCase(),
        logedIn: false
       });

       res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
        });
    }catch(error){
        res.status(500).json({message: "Internal server error" , error: error.message});
    }
};
const loginUser = async (req, res) => {
    try{
        // checking if the user already exists in the database
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user){
            return res.status(400).json({message: "User does not exist"

             });
        }
        // comparing the password with the hashed password
        const isMatch = await user.comparePassword(password)
        if(!isMatch)
            return res.status(400).json({
         message: "Invalid credentials"
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }catch(error){
        res.status(500).json({
            message: "Internal server error" , error: error.message});
    }
};

const logoutUser = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        }); 
        if(!user){
            return res.status(400).json({
                message: "User does not exist"});
        }
        res.status(200).json({
            message: "User logged out successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }catch(error){
        res.status(500).json({
            message: "Internal server error" , error: error.message});
    }
};

export {registerUser, loginUser, logoutUser};