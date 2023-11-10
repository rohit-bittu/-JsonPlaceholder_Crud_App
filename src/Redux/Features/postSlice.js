// postsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// fetching Data
export const getPosts = createAsyncThunk('Data/getPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

//  for creating a new data
export const createPost = createAsyncThunk('Data/createPost', async (postData) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
    return response.data;
});

// updating a data
export const editPost = createAsyncThunk('Data/updatePost', async ({ id, updatedData }) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData);
    return response.data;
});

// deleting a post
export const deletePost = createAsyncThunk('Data/deletePost', async (postId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return postId;
});

// Create the Data slice
const postsSlice = createSlice({
    name: 'Data',
    initialState: {
        Data: [],
        status: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetching Data
            .addCase(getPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.Data = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // creating a new post
            .addCase(createPost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.Data.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // updating a post
            .addCase(editPost.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                const index = state.Data.findIndex((post) => post.id === updatedPost.id);
                if (index !== -1) {
                    state.Data[index] = updatedPost;
                }
            })
            // deleting a post
            .addCase(deletePost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const postId = action.payload;
                state.Data = state.Data.filter((post) => post.id !== postId);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default postsSlice.reducer;

// Export the asynchronous thunks for use in components or other parts of your application

