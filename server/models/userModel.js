const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a name']
    },
    profilePicturePath: {
        type: String,
        default: ""
    },
    profilePostPublished: {
        type: Number,
        default: 0
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
