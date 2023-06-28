import React from 'react'
import { Box, Stack } from "@mui/material"
//COMPONENTS
import Navbar from "../components/Navbar"
import Login from "../components/Login"
import { UserType, loginProps } from '../types/UserType'

function LoginPage ({userType}:loginProps) {
    
    const users:UserType[] = userType
    return (
        <Box>
            <Navbar />
            <Login userType={users}/>
        </Box>
    )
}

export default LoginPage