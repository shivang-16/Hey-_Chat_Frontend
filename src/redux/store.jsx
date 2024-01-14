import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { allUsersSlice } from "./slice/userSlice";
import Connected_Users from "./slice/connectedUser";
import chatReducer from "./slice/chat";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersSlice.reducer,
    connected_users: Connected_Users,
    chat: chatReducer,
  },
});

export default store;
