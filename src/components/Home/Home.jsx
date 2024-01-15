import React, { useState } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div className="home">
      <div className="homebox">
        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
      <div className="homebox">
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default Home;
