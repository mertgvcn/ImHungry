import React from 'react'
import { useEffect, useState } from "react"
import {UserType} from "../types/UserType"
//MUI ELEMENTS
import { Box, Typography, Stack, Divider, TextField, Button } from "@mui/material"
import styled from '@emotion/styled'
import { ShoppingBasket } from '@mui/icons-material';
//DB
import { db } from "../firebase-config"
import { getDocs, collection } from "firebase/firestore"

//STYLE
const MyBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginTop: 60,
    width: 500,
    height: 470,
    backgroundColor: "#282e49",
    color: "white",
    borderRadius: 10
})

const MyTypography = styled(Typography)({
    fontSize: 30,
    fontWeight: "bold"
})

const MyTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px",
    width: 300,
})

const MyButton = styled(Button)({
    width: 300,
    fontSize: 16,
    fontWeight: "bold"
})

const Login: React.FC = () => {

    //GETTING USER LIST FROM DATA BASE
    const [users, setUsers] = useState<UserType[]>([]);
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            //setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //without typescript
            setUsers(data.docs.map((doc) => ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                userName: doc.data().userName,
                email: doc.data().email,
                password: doc.data().password
              })));
        };

        getUsers();
    }, []);

    users.map((user)=> {
        console.log(user)
    })

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
        <MyBox>
            {/* FRAME */}
            <Stack direction={"column"}>

                {/* HEADER */}
                <Stack direction={'column'} marginTop={3} alignItems={"center"}>
                    <ShoppingBasket sx={{ width: "70px", height: "70px" }} />
                    <MyTypography>LOGIN</MyTypography>
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
                    <Button color="secondary" size="small" sx={{ color: "#26a3af", fontWeight: "normal", width: 300 }} onClick={forgotPassword}>Forgot my password</Button>
                </Stack>

            </Stack> {/* END FRAME */}
        </MyBox>
    )
}

export default Login