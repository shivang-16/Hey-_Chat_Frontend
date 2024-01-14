import React, { useState } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
      <div>
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Home;
