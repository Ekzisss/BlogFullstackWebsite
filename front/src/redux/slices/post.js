import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (tag) => {
  const { data } = tag ? await axios.get(`/posts/tag/${tag}`) : await axios.get('/posts');
  return data;
});

export const fetchPopPosts = createAsyncThunk('posts/fetchPopPosts', async (tag) => {
  const { data } = tag ? await axios.get(`/posts-pop/${tag}`) : await axios.get('/posts-pop');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`)
);

export const fetchComments = createAsyncThunk('posts/fetchComments', async (latest) => {
  const { data } = latest ? await axios.get('comments/latest') : await axios.get('comments');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  postsPop: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //get posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    //get tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    //get popPosts
    [fetchPopPosts.pending]: (state) => {
      state.postsPop.items = [];
      state.postsPop.status = 'loading';
    },
    [fetchPopPosts.fulfilled]: (state, action) => {
      state.postsPop.items = action.payload;
      state.postsPop.status = 'loaded';
    },
    [fetchPopPosts.rejected]: (state) => {
      state.postsPop.items = [];
      state.postsPop.status = 'error';
    },

    //get comments
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },

    //remove post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;
