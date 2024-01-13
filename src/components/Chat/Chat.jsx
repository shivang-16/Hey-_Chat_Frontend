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
import { useSelector } from "react-redux";

const Chat = ({ name }) => {
  const socket = useMemo(() => io(Hey_Server), []);
  const [text, setText] = useState("");
  const [received, setReceived] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(text)
    const newMessage = { message: text, user: user.name };
    const updatedMessages = [...received, newMessage];
    socket.emit("message", updatedMessages);
    socket.emit("text", updatedMessages);
    setReceived(updatedMessages);
    setText("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("received_text", (text) => {
      console.log(text);
      setReceived(text);
    });
  }, []);

  return (
    <div className="chat" style={{ width: "83vw" }}>
      <AppBar
        sx={{ position: "relative", padding: "1.2rem" }}
        variant="outlined"
      >
        {name}
      </AppBar>

      <div className="chatArea" style={{ height: "83vh" }}>
        {received &&
          received.map((message) => (
            <Stack>
              <Typography variant="h6" color={"darkgreen"}>
                {message.user}
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
