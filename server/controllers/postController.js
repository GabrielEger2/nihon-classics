const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel')

// Get Posts
// GET /api/posts
// Acess Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()

    res.status(200).json(posts)
})

// Set Post
// POST /api/posts
// Acess Private
const setPost = asyncHandler(async (req, res) => {
    if (!req.body.product || !req.body.price) {
        res.status(400)
        throw new Error('Please add both product and price for the post')
    }

    const post = await Post.create({
        product: req.body.product,
        price: req.body.price
    })
    res.status(200).json(post)
})

// Update Post
// PUT /api/posts/:id
// Acess Private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if(!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatePost)
})

// Delete Post
// DELETE /api/posts/:id
// Acess Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
  
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Post deleted successfully' });
  });
  

module.exports = {
    getPosts, setPost, updatePost, deletePost
}