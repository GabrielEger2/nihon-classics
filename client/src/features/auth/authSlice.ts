import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


// Get user from localStorage
const user = localStorage.getItem('user');
const parsedUser = user ? JSON.parse(user) : null;

const initialState = {
  user: parsedUser,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error : any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error : any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Update user name
export const updateuserName = createAsyncThunk(
  'posts/update-username',
  async (userData : { values : any}, thunkAPI : any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateuserName(userData, token)
    } catch (error : any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user email
export const updateUserEmail = createAsyncThunk(
  'posts/update-email',
  async (userData : { values : any}, thunkAPI : any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateuserEmail(userData, token)
    } catch (error : any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user password
export const updateUserPassword = createAsyncThunk(
  'posts/update-password',
  async (userData : { values : any}, thunkAPI : any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateuserPassword(userData, token)
    } catch (error : any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user profile picture path
export const updateUserProfilePicture = createAsyncThunk(
  'posts/update-profile-picture',
  async (userData : { values : any}, thunkAPI : any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateUserProfilePicturePath(userData, token)
    } catch (error : any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(updateuserName.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateuserName.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(updateuserName.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(updateUserProfilePicture.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(updateUserProfilePicture.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer