// import { AppBar, Container } from '@mui/material'
import React from 'react'
import './sidebar.scss'
import Appbar from './Appbar'
import { Stack, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'

const Sidebar = ({user, setUser}) => {

    user =["Shivang", "Lucky", "Tanya", "Mummy"]
    const handleClick = (name) => {
      console.log(name)
      setUser(name)
    }

  return (
    <React.Fragment>
    <div className = 'sidebar'>
        <div className='appbar'> 
        <Appbar/>
        </div>
       { user && user.map((name) => (
       <Stack direction={'row'} spacing={'2rem'} borderBottom={'1px solid rgb(43, 43, 43)'} padding={'1rem'} sx={{cursor:'pointer'}} onClick={() => handleClick(name)}>
        <AccountCircle/>
        <Typography>{name}</Typography>
        </Stack>))}
      
        {/* <Stack>hello</Stack>
        <Stack>hello</Stack>
        <Stack>hello</Stack>
        <Stack>hello</Stack>
        <Stack>hello</Stack> */}
    </div>
    
    </React.Fragment>
  )
}

export default Sidebar