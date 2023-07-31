import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

// Register user
const register = async (userData : any) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    response.data.profilePicturePath = ""
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData : any) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Update user name
const updateuserName = async (userData : any, token : any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'update-username', userData, config)

  return response.data
}

// Update user email
const updateuserEmail = async (userData : any, token : any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'update-email', userData, config)

  return response.data
}

// Update user password
const updateuserPassword = async (userData : any, token : any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'update-password', userData, config)

  return response.data
}

// Update user profile Picture path
const updateUserProfilePicturePath = async (userData : any, token : any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'update-profile-picture', userData, config)

  return response.data
}


const authService = {
  register,
  logout,
  login,
  updateuserName,
  updateuserEmail,
  updateuserPassword,
  updateUserProfilePicturePath
}

export default authService