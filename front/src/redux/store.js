import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/post';
import { messageReducer } from './slices/message';

const store = configureStore({
  message: '',
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
