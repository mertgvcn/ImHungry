import React from 'react'
import { Box, AppBar, Typography, Container, Stack } from "@mui/material"
import styled from '@emotion/styled'
import { ShoppingBasket, Person } from '@mui/icons-material';

const MyAppBar = styled(AppBar)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    backgroundColor: "#06060f",
    fontSize: 20
})

const MyTypography = styled(Typography)({
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold"
})

const Navbar: React.FC= () => {

    const goLogin = () => {
        window.location.href = "/"
    }

    return (
        <MyAppBar position='sticky'>
            <Container sx={{display: "flex", justifyContent:"space-between"}}>
                <Stack direction="row" spacing={2}>
                    <ShoppingBasket/>
                    <MyTypography onClick={goLogin} sx={{cursor: "pointer"}}>IM HUNGRY</MyTypography>
                </Stack>

                <Person sx={{width: 30, height: 30}}/>
            </Container>
        </MyAppBar>
    )
}

export default Navbar