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

const Chat = ({ selectedUser }) => {
  const socket = useMemo(() => io(Hey_Server), []);
  const [text, setText] = useState("");
  const [received, setReceived] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(text)
    const newMessage = { message: text, by: user.name, to:selectedUser?.name, targetSocketId: selectedUser?.socketId };
    const updatedMessages = [...received, newMessage];
    socket.emit("text", updatedMessages);
    setReceived(updatedMessages);
    setText("");
  };

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
    console.log("before reciecedText")
    socket.on("received_text", (text) => {
      console.log("received text", text);
      setReceived(text);
    });
  }, []);

  return (
    <div className="chat" style={{ width: "83vw" }}>
      <AppBar
        sx={{ position: "relative", padding: "1.2rem" }}
        variant="outlined"
      >
        {selectedUser?.name}
      </AppBar>

      <div className="chatArea" style={{ height: "83vh" }}>
        {received &&
          received.map((message, index) => (
            <Stack key={index}>
              <Typography variant="h6" color={"darkgreen"}>
                {message.by === user.name ? "You" : message.by}
              </Typography>
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
