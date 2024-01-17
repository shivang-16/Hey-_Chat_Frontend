// import { AppBar, Container } from '@mui/material'
import React, { useState } from "react";
import "./sidebar.scss";
import Appbar from "./Appbar";
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux";
import {  getChatBySenderAndReceiver } from "../../redux/actions/chatActions";
import { useNavigate } from "react-router-dom";
import ModalBox from "../ModelBox/ModelBox";
import { addGroups, getAllGroups } from "../../redux/actions/groupActions";
import { socket } from "../../main";


const Sidebar = ({ selectedUser, setSelectedUser, selectedGroup, setSelectedGroup }) => {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user: currentUser } = useSelector((state) => state.user);
  const { connected_users } = useSelector((state) => state.connected_users);
  const { allGroups } = useSelector((state) => state.allGroups)
  const { groups } = useSelector((state) => state.groups)
  const [open, setOpen] = useState(false)

  const [groupName, setGroupName] = useState('')

  const dispatch = useDispatch()

  const handleClickUser = (name, socketId, userId) => {
    console.log(name);
    setSelectedUser({ name, socketId, userId });
    setSelectedGroup(undefined)
    dispatch(getChatBySenderAndReceiver({senderId: currentUser._id, receiverId: userId}))
  };
  const filteredUsers = connected_users.filter(
    (el) => el.name !== currentUser.name,
  );
  const navigate = useNavigate()
  
   const handleCreateGroup = () => {
     setOpen(true)
   }

   const handleClickGroup = (groupName, groupId, members) => {
      console.log("hello")
      socket.emit("join_room", groupName)
      setSelectedGroup({groupName, groupId, members})
      setSelectedUser(undefined)
   }

  //  console.log(selectedGroup,"group in sidebar")
  //  console.log(selectedUser)
  //  console.log(groupName)
   const handleCreate = async(e) => {
    e.preventDefault()
    console.log("inside", groupName)

    await dispatch(addGroups(groupName))
    dispatch(getMyGroups())
    dispatch(getAllGroups())

    setOpen(false)
    // setSelectedUser(groupName)
  }
   
  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="appbar">
          <Appbar />
        </div>

        <Button sx={{color: "white"}} onClick={handleCreateGroup}>Create Groups</Button>
        <Accordion  sx={{backgroundColor:"rgb(41, 40, 40)", color:"white"}}>
          <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1-content"
           id="panel1-header"
          
          >
            Browse Groups
          </AccordionSummary>
         { allGroups && allGroups.map((group) => (
          <AccordionDetails>
             <Button sx={{color: "white"}} onClick={() => handleClickGroup(group.groupName, group._id, group.members)}>{group.groupName}</Button>  
         </AccordionDetails>
         ))}
        </Accordion>
        <Accordion  sx={{backgroundColor:"rgb(41, 40, 40)", color:"white"}}>
        <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1-content"
           id="panel1-header"
          
          >
            Your Groups
          </AccordionSummary>
          { groups && groups?.map((group) => (
          <AccordionDetails>
             <Button sx={{color: "white"}} onClick={() => handleClickGroup(group.groupName, group._id, group.members)}>{group.groupName}</Button>  
         </AccordionDetails>
         ))}
          </Accordion>
        <Accordion  sx={{backgroundColor:"rgb(41, 40, 40)", color:"white"}}>
        <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1-content"
           id="panel1-header"
          
          >
            Live Users
          </AccordionSummary>
        {connected_users &&
          filteredUsers.map((user) => (
            <Stack
              direction={"row"}
              spacing={"2rem"}
              borderBottom={"1px solid rgb(120, 120, 120)"}
              padding={"1rem"}
              sx={{ cursor: "pointer" }}
              onClick={() => handleClickUser(user.name, user.socketId, user.userId)}
            >
              <AccountCircle />
              <Typography>{user.name}</Typography>
            </Stack>
          ))}
          </Accordion>
       
        {connected_users &&
          filteredUsers.map((user) => (
            <Stack
              direction={"row"}
              spacing={"2rem"}
              borderBottom={"1px solid rgb(120, 120, 120)"}
              padding={"1rem"}
              sx={{ cursor: "pointer" }}
              onClick={() => handleClickUser(user.name, user.socketId, user.userId)}
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
      <ModalBox open={open} setOpen={setOpen} title="Create Groups with Hey! Chat" button="Create" groupName={groupName} setGroupName={setGroupName} submitFunction={handleCreate} />
    </React.Fragment>
  );
};

export default Sidebar;
