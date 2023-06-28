import React from 'react'
import { useState } from "react"
import { UserType, loginProps } from "../types/UserType"
//MUI ELEMENTS
import { Stack, Divider } from "@mui/material"
import { MyBox, MyTypography, MyTextField, MyButton } from './styles/LoginStyle';
import { ShoppingBasket } from '@mui/icons-material';



const Login = ({userType}:loginProps) => {

    const users:UserType[] = userType

    //LOGIN INPUTS
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    //FUNCTIONS
    const goRegister = () => {
        window.location.href = "/registration"
    }

    const checkLogin = () => {
        let key = false;

        users.map((user) => {
            if (user.userName === userName && user.password === password) {
                key = true;
                return;
            }
        })

        if (key) {
            window.location.href = "/home"
            setUserName("")
            setPassword("")
        } else {
            setUserName("")
            setPassword("")
            alert("Kullanıcı adı veya Şifre yanlış")
        }

    }

    const forgotPassword = () => {
        let key = false;

        let email = prompt("Enter your email :");
        users.map((user) => {
            if (user.email == email) {
                key = true;
                return;
            }
        })

        if (key) {
            alert("We sent you an email!")
        } else {
            alert("This email is not registered!")
        }
    }

    return (
        <MyBox className="myBox">
            {/* FRAME */}
            <Stack direction={"column"}>

                {/* HEADER */}
                <Stack direction={"column"} marginTop={3} alignItems={"center"}>
                    <ShoppingBasket sx={{ width: "70px", height: "70px" }} />
                    <MyTypography className="myTypography">LOGIN</MyTypography>
                    <Divider sx={{ width: 400, marginTop: 1, backgroundColor: 'white' }} />
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
    )
}

export default Login