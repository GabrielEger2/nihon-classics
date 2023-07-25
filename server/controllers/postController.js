const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// Get Posts
// GET /api/posts
// Access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

// Set Post
// POST /api/posts
// Access Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.postType || 
      !req.body.carBrand || 
      !req.body.carModel || 
      !req.body.releaseYear || 
      !req.body.carColor || 
      !req.body.carMileage ||
      !req.body.licensePlate || 
      !req.body.price || 
      !req.body.carPhoto
    ) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const post = await Post.create({
    user: req.user.id,
    postType: req.body.postType,
    carBrand: req.body.carBrand,
    carModel: req.body.carModel,
    releaseYear: req.body.releaseYear,
    carColor: req.body.carColor,
    carMileage: req.body.carMileage,
    licensePlate: req.body.licensePlate,
    price: req.body.price,
    carPhoto: req.body.carPhoto,
    carDetails: req.body.carDetails
  });
  res.status(201).json(post);
});

// Delete Post
// DELETE /api/posts/:id
// Access Private
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
  getPosts,
  setPost,
  deletePost
};