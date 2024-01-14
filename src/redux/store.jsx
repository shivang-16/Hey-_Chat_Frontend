import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { allUsersSlice } from "./slice/userSlice";
import Connected_Users from "./slice/connectedUser";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersSlice.reducer,
    connected_users: Connected_Users,
  },
});

export default store;
