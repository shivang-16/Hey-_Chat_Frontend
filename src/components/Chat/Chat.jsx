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
import { getChat } from "../../redux/actions/chatActions";
import SaveIcon from "@mui/icons-material/Save";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ selectedUser }) => {
  const socket = useMemo(() => io(Hey_Server), []);
  const [text, setText] = useState("");
  const [received, setReceived] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
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

    dispatch(getChat(updatedMessages));
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
  }, []);
  console.log(received, "all_messages");

  const handleSave = () => {};

  return (
    <div className="chat" style={{ width: "72vw" }}>
      <AppBar
        sx={{ position: "relative", padding: "1.2rem" }}
        variant="outlined"
      >
        {selectedUser?.name}
      </AppBar>

      <div className="chatArea" style={{ height: "85vh" }}>
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
              <Typography>{message.message}</Typography>
            </Stack>
          ))}
      </div>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          fullWidth
          placeholder="Enter Message"
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
      </form>
    </div>
  );
};

export default Chat;
