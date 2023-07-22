const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// Register a user
// POST /api/users
// Acess Public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    //Check if form has been completaly filled
    if(!userName || !email || !password) {
        res.status(422)
        throw new Error("Please add all fields");
    };

    //Check if the user already exists
    const checkUserEmail = await User.findOne({ email })
    const checkUserName = await User.findOne({ userName })

    if(checkUserEmail) {
        res.status(409);
        throw new Error('Email already registered')
    }
    if(checkUserName) {
        res.status(409);
        throw new Error('UserName already registered')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    }) 
    
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.userName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

});

// Authenticate a user
// POST /api/users/login
// Acess Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, userName, password} = req.body

    //check if user exists
    const user = await User.findOne({ $or: [{ email }, { userName }] });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.userName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

});

// Get user data
// GET /api/users/me
// Acess Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, userName, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        userName,
        email
    })
});

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    })
}

module.exports = { registerUser, loginUser, getMe}