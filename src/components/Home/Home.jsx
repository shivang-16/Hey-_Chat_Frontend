import React, { useState } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  const [user, setUser] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar user={user} setUser={setUser} />
      </div>
      <div>
        <Chat name={user} />
      </div>
    </div>
  );
};

export default Home;
