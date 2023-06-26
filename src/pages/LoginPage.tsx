import React from 'react'
import { Box, Stack } from "@mui/material"
//COMPONENTS
import Navbar from "../components/Navbar"
import Login from "../components/Login"

function LoginPage() {
    return (
        <Box>
            <Navbar />
            <Login />
        </Box>
    )
}

export default LoginPage