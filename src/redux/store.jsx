import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { allUsersSlice } from "./slice/userSlice";
import Connected_Users from "./slice/connectedUser";
import chatReducer from "./slice/chat";
import groupReducer from './slice/group'
import { allGroupSlice } from "./slice/group";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersSlice.reducer,
    connected_users: Connected_Users,
    chat: chatReducer,
    groups: groupReducer,
    allGroups: allGroupSlice.reducer,
  },
});

export default store;
