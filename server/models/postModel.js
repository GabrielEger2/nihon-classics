const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    price: {
        type: Number,
        required: [true, 'Please add the product price']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)