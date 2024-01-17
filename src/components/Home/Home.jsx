import React, { useState } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [selectedGroup, setSelectedGroup] = useState()
  // console.log("group", selectedGroup)

  return (
    <div className="home">
      <div className="homebox">
        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
      <div className="homebox">
        <Chat selectedUser={selectedUser} selectedGroup={selectedGroup}/>
      </div>
    </div>
  )
}

export default Home;
