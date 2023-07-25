import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new post
export const createNewPost = createAsyncThunk(
  'posts/create',
  async (postData : { values : any}, thunkAPI : any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(postData, token)
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

// Get user posts
export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts()
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

// Delete user posts
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI : any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePost(id, token)
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

// Update user posts
export const updatePost = createAsyncThunk(
    'posts/update',
    async (id, thunkAPI : any) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.updatePost(id, token)
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

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state : any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getPosts.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state : any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal : any) => goal._id !== action.payload.id
        )
      })
      .addCase(deletePost.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state : any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal : any) => goal._id !== action.payload.id
        )
      })
      .addCase(updatePost.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer