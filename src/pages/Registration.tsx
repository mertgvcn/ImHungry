import React from 'react'
import { Box} from "@mui/material"
//COMPONENTS
import Navbar from "../components/Navbar"
import Register from "../components/Register"
import { loginProps } from '../types/UserType'

function Registration({userType, usersCollectionRef}:loginProps) {
  return (
    <Box>
        <Navbar/>
        <Register userType={userType} usersCollectionRef={usersCollectionRef}/>
    </Box>
  )
}

export default Registration