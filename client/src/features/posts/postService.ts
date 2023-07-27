import axios from 'axios'

const API_URL = 'http://localhost:5000/api/posts/'

// Create new post
const createPost = async (postData : any, token : any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, postData, config)

  return response.data
}

// Get all posts
const getPosts = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// Delete user post
const deletePost = async (postId : any, token : any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + postId, config)

  return response.data
}

//Get post by ID
const getPostByID = async (postId : any) => {
  const response = await axios.get(API_URL + postId)

  return response.data
}

const goalService = {
    createPost,
    getPosts,
    getPostByID,
    deletePost
}

export default goalService