import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageList: [],
};

const messageSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log(state.items);
      console.log(action);
      state.messageList.push({
        message: action.payload.message,
        state: action.payload.state,
      });
    },
    removeItem: (state) => {
      state.messageList.shift();
    },
  },
});

export const messageReducer = messageSlice.reducer;

export const { addMessage, removeItem } = messageSlice.actions;
