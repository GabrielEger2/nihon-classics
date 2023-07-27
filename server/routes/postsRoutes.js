const express = require('express');
const router = express.Router();

const { getPosts, setPost, deletePost, getPostByID } = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getPosts).post(protect, setPost)
router.route('/:id').delete(protect, deletePost).get(getPostByID)

module.exports = router