import React from 'react'
import { Box } from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction';
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <Box>
      <Navbar />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20, color: "white" }}>
        <Box sx={{ fontSize: 100 }}>
          This Page Under Construction
        </Box>
        <ConstructionIcon sx={{ width: 200, height: 200, color: "yellow" }} />
      </Box>

    </Box>

  )
}

export default Home 