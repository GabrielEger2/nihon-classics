const asyncHandler = require('express-async-handler');

// Get Posts
// GET /api/posts
// Acess Public
const getPosts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Posts'})
})

// Set Post
// POST /api/posts
// Acess Private
const setPost = asyncHandler(async (req, res) => {
    
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text for the post')
    }
    res.status(200).json({ message: 'Set Posts'})
})

// Update Post
// PUT /api/posts/:id
// Acess Private
const updatePost = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update post ${req.params.id}`})
})

// Delete Post
// DELETE /api/posts/:id
// Acess Private
const deletePost = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete post ${req.params.id}`})
})

module.exports = {
    getPosts, setPost, updatePost, deletePost
}