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
      password: hashedPassword,
      profilePostPublished: 0
    })
    
    if (user) {
      res.status(201).json({
          _id: user.id,
          userName: user.userName,
          email: user.email,
          token: generateToken(user._id),
          profilePostPublished: 0
      });
      } else {
          res.status(400);
          throw new Error('Invalid user data');
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
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
            profilePicturePath: user.profilePicturePath,
            profilePostPublished: user.profilePostPublished
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

});

// Get a user data
// GET /api/users/:id
// Acess Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    res.status(200).json(user);
});

// Update username
// PUT /api/users/update-username
// Access Private
const updateUserName = asyncHandler(async (req, res) => {
    const { userName } = req.body;
  
    const user = await User.findById(req.user._id);

    //Check if the user already exists
    const checkUserName = await User.findOne({ userName })

    if(checkUserName) {
        res.status(409);
        throw new Error('UserName already registered')
    }
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    user.userName = userName;
    await user.save();
  
    res.json({
      message: 'Username updated successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  });
  
  // Update email
  // PUT /api/users/update-email
  // Access Private
  const updateUserEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findById(req.user._id);

    //Check if the user already exists
    const checkUserEmail = await User.findOne({ email })

    if(checkUserEmail) {
        res.status(409);
        throw new Error('Email already registered')
    }
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    user.email = email;
    await user.save();
  
    res.json({
      message: 'Email updated successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  });
  
  // Update password
  // PUT /api/users/update-password
  // Access Private
  const updateUserPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const { oldPassword } = req.body;
  
    const user = await User.findById(req.user._id);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Passwords do not match');
    }

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
  
    await user.save();
  
    res.json({
      message: 'Password updated successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  });
  
  // Update profile picture
  // PUT /api/users/update-profile-picture
  // Access Private
  const updateUserProfilePicture = asyncHandler(async (req, res) => {
    const { profilePicturePath } = req.body;
  
    const user = await User.findById(req.user._id);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    user.profilePicturePath = profilePicturePath;
    await user.save();
  
    res.json({
      message: 'Profile picture updated successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profilePicturePath: user.profilePicturePath,
      },
    });
  });

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    updateUserProfilePicture,
  };