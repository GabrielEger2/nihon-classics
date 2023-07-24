const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    carBrand: {
        type: String,
        required: [true, 'Please add a car brand value'],
    },
    carModel: {
        type: String,
        required: [true, 'Please add a car model value'],
    },
    releaseYear: {
        type: Number,
        required: [true, 'Please add a release year value'],
    },
    carColor: {
        type: String,
        required: [true, 'Please add a car color value'],
    },
    carMileage: {
        type: Number,
        required: [true, 'Please add a car mileage value'],
    },
    licensePlate: {
        type: String,
        required: [true, 'Please add a license plate value'],
    },
    price: {
        type: Number,
        required: [true, 'Please add the car product price']
    },
    carPhoto: {
        type: String,
        required: [true, 'Please add a photo path value'],
    },
    carDetails: {
        type: String,
        required: [true, 'Please add a car details value'],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)