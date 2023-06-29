import React from 'react'
import { useState } from "react"
import { UserType, loginProps } from "../types/UserType"
//MUI ELEMENTS
import { Stack, Divider, Alert } from "@mui/material"
import { ShoppingBasket } from '@mui/icons-material';
import { MyBox, MyTypography, MyTextField, MyButton } from './styles/LoginStyle';



const Login = ({ userType }: loginProps) => {

    const users: UserType[] = userType

    //LOGIN INPUTS
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    //ALERT PROPERTIES
    const [type, setType] = useState<any>("");
    const [msg, setMsg] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    //FUNCTIONS
    const goRegister = () => {
        window.location.href = "/registration"
    }

    const checkLogin = () => {
        if (userName == "" || password == "") {
            popAlert("warning", "Username or password cannot be left blank!")
            return;
        }

        if (users.some(user => user.userName === userName && user.password === password)) {
            popAlert("success", "Login successful!")
            window.location.href = "/home";
            return;
        }

        popAlert("error", "User name or password is wrong!")
    }

    const forgotPassword = () => {

        let email = prompt("Enter your email :");
        if (users.some(user => user.email === email)) {
            popAlert("success", "We sent you an email!")
            return;
        }

        popAlert("error", "This email is not registered!")

    }

    const popAlert = (type: string, msg: string) => {
        setOpen(true)
        setType(type)
        setMsg(msg)

        setTimeout(() => {
            setOpen(false)
        }, 3000)
    }

    return (
        <>
            {open && <Alert variant="filled" severity={type} sx={{ display: "flex", justifyContent: "center" }}>{msg}</Alert>}

            <MyBox sx={{ width: { xs: "100%", sm: "500px" } }}>
                {/* FRAME */}
                <Stack direction={"column"}>

                    {/* HEADER */}
                    <Stack direction={"column"} marginTop={3} alignItems={"center"}>
                        <ShoppingBasket sx={{ width: "70px", height: "70px" }} />
                        <MyTypography>LOGIN</MyTypography>
                        <Divider sx={{ width: "100%", marginTop: 1, backgroundColor: 'white' }} />
                    </Stack>

                    {/* INPUTS - BUTTONS */}
                    <Stack direction={'column'} marginTop={3} spacing={2} alignItems={"center"}>
                        {/* userName - password Inputs */}
                        <MyTextField value={userName} id="userName" variant="outlined" type="text"
                            placeholder='User Name' size='small' onChange={(e) => setUserName(e.target.value)} />
                        <MyTextField value={password} id="password" variant="outlined" type="password"
                            placeholder='Password' size='small' onChange={(e) => setPassword(e.target.value)} />

                        {/* login-register-forgot password buttons */}
                        <MyButton variant="contained" size="large" sx={{ backgroundColor: "#26a3af" }} onClick={checkLogin}>Login</MyButton>
                        <MyButton variant="outlined" size="large" sx={{ color: "#26a3af" }} onClick={goRegister}>Register</MyButton>
                        <MyButton color="secondary" size="small" sx={{ color: "#26a3af", fontWeight: "normal", width: 300 }} onClick={forgotPassword}>Forgot my password</MyButton>
                    </Stack>

                </Stack> {/* END FRAME */}
            </MyBox>
        </>

    )
}

export default Login