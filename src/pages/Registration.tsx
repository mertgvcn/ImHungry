import React from 'react'
import { Box} from "@mui/material"
//COMPONENTS
import Navbar from "../components/Navbar"
import Register from "../components/Register"

function Registration() {
  return (
    <Box>
        <Navbar/>
        <Register/>
    </Box>
  )
}

export default Registration