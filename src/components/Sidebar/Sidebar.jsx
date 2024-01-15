// import { AppBar, Container } from '@mui/material'
import React, { useState } from "react";
import "./sidebar.scss";
import Appbar from "./Appbar";
import { Button, Stack, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import {  getChatBySenderAndReceiver } from "../../redux/actions/chatActions";
import { useNavigate } from "react-router-dom";
import ModalBox from "../ModelBox/ModelBox";


const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user: currentUser } = useSelector((state) => state.user);
  const { connected_users } = useSelector((state) => state.connected_users);
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const handleClick = (name, socketId, userId) => {
    console.log(name);
    setSelectedUser({ name, socketId, userId });
    dispatch(getChatBySenderAndReceiver({senderId: currentUser._id, receiverId: userId}))
  };
  const filteredUsers = connected_users.filter(
    (el) => el.name !== currentUser.name,
  );
  const navigate = useNavigate()
   const handleGroupClick = () => {
     setOpen(true)
   }
   
  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="appbar">
          <Appbar />
        </div>
        <Button sx={{color: "white"}} onClick={handleGroupClick}>Create Groups</Button>
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
      <ModalBox open={open} setOpen={setOpen}/>
    </React.Fragment>
  );
};

export default Sidebar;
