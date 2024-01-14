import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  chat: [],
};

const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    getChatRequest: (state) => {
      state.loading = true;
    },
    getChatSuccess: (state, action) => {
      state.loading = false;
      state.chat = action.payload;
    },
    getChatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getChatRequest, getChatSuccess, getChatFail } =
  chatSlice.actions;
export default chatSlice.reducer;
