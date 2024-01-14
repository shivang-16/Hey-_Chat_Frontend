import { createSlice } from "@reduxjs/toolkit";

export const Connected_User = createSlice({
  name: "Connected_User",
  initialState: { connected_users: [] },
  reducers: {
    connected_users: (state, action) => {
      state.connected_users = action.payload;
    },
  },
});

export const { connected_users } = Connected_User.actions;
export default Connected_User.reducer;
