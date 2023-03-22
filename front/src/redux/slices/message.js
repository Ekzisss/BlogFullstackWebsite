import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const messageSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      // console.dir(state.items);
      // console.log(action);
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.shift();
    },
  },
});

export const messageReducer = messageSlice.reducer;

export const { addMessage, removeItem } = messageSlice.actions;
