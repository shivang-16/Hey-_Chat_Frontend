import {
  AppBar,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import { Hey_Server } from "../../main";
import { useSelector, useDispatch } from "react-redux";
import { connected_users } from "../../redux/slice/connectedUser";
import "./chat.scss";
import { saveChat } from "../../redux/actions/chatActions";
import SaveIcon from "@mui/icons-material/Save";
import { v4 as uuidv4 } from "uuid";
import ModalBox from "../ModelBox/ModelBox";
import { joinGroup } from "../../redux/actions/groupActions";
import { socket } from "../../main";

const Chat = ({ selectedUser, selectedGroup }) => {

  console.log(selectedUser, selectedGroup)
  const socket = useMemo(() => io(Hey_Server), []);
  const [text, setText] = useState("");
  const [received, setReceived] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [open, setOpen] = useState(false)
    
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.chat)

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);

    if(selectedUser) {
      const newMessage = {
        message: text,
        messageId: uuidv4(),
        sender: user.name,
        senderId: user._id,
        receiver: selectedUser?.name,
        receiverId: selectedUser?.userId,
        targetSocketId: selectedUser?.socketId,
      };
      const updatedMessages = [...received, newMessage];
      setReceived(updatedMessages);
      socket.emit("text", updatedMessages);
      dispatch(saveChat(updatedMessages));
    }

    if(selectedGroup) {
      console.log(selectedGroup)
      const groupInfo = {
        groupName: selectedGroup?.groupName,
        message: text,
        sender: user.name
      }

      const updatedInfo = [...received, groupInfo];
      console.log(updatedInfo)
      setReceived(updatedInfo);
      
      socket.emit("group_text", updatedInfo)
  
    }


  

    setText("");
  };

  useEffect(() => {
    setReceived([]);
  }, [selectedUser]);
  // const allMessages = [];
  let newMessage;
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("welcome", {
        name: user.name,
        userId: user._id,
        socketId: socket.id,
      });
    });

    socket.on("connected_users", (data) => {
      // console.log("connected users", data);
      dispatch(connected_users(data));
    });
    console.log("before reciecedText");
    socket.on("received_text", (text) => {
      console.log("received text", text);

      setReceived(text);
    });

    socket.on("welcomce_group", (data) => {
      console.log("WElcome", data)
    })
  }, []);
  console.log(received, "all_messages");
  
  // useEffect(() => {
  //   setAllMessages(received); // Update allMessages when chat messages change
  // }, [chat]);

  const isMember = useMemo(() => {
    console.log(selectedGroup, "INSIDE GROUPS")
    return selectedGroup?.members.some(memberId => memberId === user._id);
  }, [selectedGroup, user._id]);
  console.log(isMember)


  console.log("mapped chat", allMessages)
  console.log("group", selectedGroup?.groupId)

  const handleSave = () => {};

  const handleJoin = (groupId) => {
    dispatch(joinGroup(groupId))
  }
  return (
    <div className="chat" style={{ width: "80vw"}}>
      
      <AppBar
        sx={{ position: "relative", padding: "1.2rem" }}
        variant="outlined"
      >
        {selectedUser?.name || selectedGroup?.groupName || "Hello "}
      </AppBar>

      <div className="chatArea " >
        {received &&
          received.map((message, index) => (
            <Stack
              className={`message ${
                message?.senderId === user._id ? "right" : "left"
              }`}
              key={index}
              display={"inline-block"}
            >
              {/* <Typography variant="h6" className="userName">
                {message?.senderId === user._id ? "You" : message?.sender}
              </Typography> */}
              <Typography>{message?.message}</Typography>
            </Stack>
          ))}
      </div>
      { selectedUser || isMember ?  <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          fullWidth
          placeholder="Enter Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          onClick={handleSave}
          sx={{
            position: "absolute",
            right: "70px",
            margin: "1rem",
            cursor: "pointer",
          }}
        >
          <SaveIcon />
        </Button>
        <Button
          type="submit"
          sx={{
            position: "absolute",
            right: "10px",
            margin: "1rem",
            cursor: "pointer",
          }}
        >
          <SendIcon />
        </Button>
      </form> : ""}
      
      {
        selectedGroup && !isMember ? ( 
        <Stack>
          <Button onClick={()=>handleJoin(selectedGroup?.groupId)}>Click here to Join Group</Button>
        </Stack>
        ) : ""
      }
      {/* <ModalBox open={open} setOpen={setOpen} title="Join this grouop to see conversation" button="Join" /> */}
    </div>
  );
};

export default Chat;
