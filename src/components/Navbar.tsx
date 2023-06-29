import React from 'react'
import { Container, Stack } from "@mui/material"
import { ShoppingBasket, Person } from '@mui/icons-material';
import { MyAppBar, MyTypography } from './styles/NavbarStyle';


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