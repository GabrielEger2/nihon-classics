const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware.js')
const {
    registerUser,
    loginUser,
    getMe,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    updateUserProfilePicture,
  } = require('../controllers/userController.js');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update-username', protect, updateUserName)
router.put('/update-email', protect, updateUserEmail)
router.put('/update-password', protect, updateUserPassword)
router.put('/update-profile-picture', protect, updateUserProfilePicture)

module.exports = router