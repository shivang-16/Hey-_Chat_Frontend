import { AppBar, TextField } from '@mui/material'
import React, {useMemo, useState, useEffect} from 'react'
import { io } from "socket.io-client"
import SendIcon from '@mui/icons-material/Send';
const Chat = ({user}) => {
    const socket = useMemo(() => io('http://localhost:4502'), [])

    useEffect(() => {
      socket.on("connect", () => {
        console.log(socket.id)
    })
    
    socket.on("welcome", (data) => {
      console.log(data)
    })
    
    }, [])

  return (
    <div className='chat' style={{width:"70vw"}}>
        <AppBar sx={{position: "relative", padding:'1.2rem'}} variant='outlined'>{user}</AppBar>
    
    <div className='chatArea' style={{height:"87vh"}}></div>
    <div style={{display:'flex'}}>
    <TextField variant='filled' fullWidth placeholder='Enter Message'/>
    <SendIcon sx={{position:"absolute", right:'10px', margin:'1rem', cursor:'pointer'}}/>
    </div>
    </div>
  )
}

export default Chat