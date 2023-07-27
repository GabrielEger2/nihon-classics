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

// get post by ID
export const getPostByID = createAsyncThunk(
  "posts/getPostById",
  async (postId: any, thunkAPI) => {
    try {
      const response = await postService.getPostByID(postId);
      return response;
    } catch (error : any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
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
        state.posts = action.payload
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
        state.posts = state.posts.filter(
          (post : any) => post._id !== action.payload.id
        )
      })
      .addCase(deletePost.rejected, (state : any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPostByID.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getPostByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.posts = action.payload; // Store the fetched post in the state
      })
      .addCase(getPostByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer