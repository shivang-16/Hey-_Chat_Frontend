// import { AppBar, Container } from '@mui/material'
import React from "react";
import "./sidebar.scss";
import Appbar from "./Appbar";
import { Stack, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user: currentUser } = useSelector((state) => state.user);
  const { connected_users } = useSelector((state) => state.connected_users);

  const handleClick = (name, socketId, userId) => {
    console.log(name);
    setSelectedUser({ name, socketId, userId });
  };
  const filteredUsers = connected_users.filter(
    (el) => el.name !== currentUser.name,
  );

  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="appbar">
          <Appbar />
        </div>
        {connected_users &&
          filteredUsers.map((user) => (
            <Stack
              direction={"row"}
              spacing={"2rem"}
              borderBottom={"1px solid rgb(43, 43, 43)"}
              padding={"1rem"}
              sx={{ cursor: "pointer" }}
              onClick={() => handleClick(user.name, user.socketId, user.userId)}
            >
              <AccountCircle />
              <Typography>{user.name}</Typography>
            </Stack>
          ))}

        {/* <Stack>hello</Stack>
        <Stack>hello</Stack>
        <Stack>hello</Stack>
        <Stack>hello</Stack>
        <Stack>hello</Stack> */}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
