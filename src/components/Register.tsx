import React from 'react'
import { useState, useEffect } from "react"
import { UserType, loginProps } from '../types/UserType'
//MUI ELEMENTS
import { Box, Typography, Stack, Divider, TextField, Button } from "@mui/material"
import styled from '@emotion/styled'
//DB
import { db } from "../firebase-config"
import { addDoc, collection, getDocs } from "firebase/firestore"


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

//for FirstName LastName  
const MyTextField2 = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px",
    width: 142,
})

const MyButton = styled(Button)({
    width: 300,
    fontSize: 16,
    fontWeight: "bold"
})

const Register = ({userType, usersCollectionRef}:loginProps) => {

    //REGISTRATION INPUTS
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    //FUNCTIONS
    const goLogin = () => {
        window.location.href = "/"
    }

    const createUser = async () => {
        let key = true

        userType.map((user) => {
            if(userName == user.userName) {
                alert("This username already selected from another user")
                setUserName("")
                key = false
            }
        })

        if(key) {
            await addDoc(usersCollectionRef, {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            })
    
            setFirstName("")
            setLastName("")
            setUserName("")
            setEmail("")
            setPassword("")
            alert("Registration Successful!")
            window.location.href = "/"
        }

    }



    return (
        <MyBox>
            {/* FRAME */}
            <Stack direction={"column"}>

                {/* HEADER */}
                <Stack direction={'column'} marginTop={3} spacing={1} alignItems={"center"}>
                    <MyTypography>Join Us</MyTypography>
                    <Divider sx={{ width: 400, marginTop: 1, backgroundColor: 'white' }} />
                </Stack>

                {/* INPUTS */}
                <Stack direction={'column'} marginTop={4} spacing={2} alignItems={"center"}>
                    {/* firstname - lastname (horizontal) */}
                    <Stack direction={"row"} spacing={2}>
                        <MyTextField2 value={firstName} id="firstName" variant="outlined" type="text"
                            placeholder='First Name' size='small' onChange={(e) => setFirstName(e.target.value.trim())} />
                        <MyTextField2 value={lastName} id="lastName" variant="outlined" type="text"
                            placeholder='Last Name' size='small' onChange={(e) => setLastName(e.target.value.trim())} />
                    </Stack>

                    {/* username - email - password */}
                    <MyTextField value={userName} id="userName" variant="outlined" type="text"
                        placeholder='User Name' size='small' onChange={(e) => setUserName(e.target.value.trim())} />
                    <MyTextField value={email} id="email" variant="outlined" type="text"
                        placeholder='Email' size='small' onChange={(e) => setEmail(e.target.value.trim())} />
                    <MyTextField value={password} id="password" variant="outlined" type="password"
                        placeholder='Password' size='small' onChange={(e) => setPassword(e.target.value.trim())} />
                </Stack>

                {/* BUTTONS */}
                <Stack direction={"column"} marginTop={4} spacing={2} alignItems={"center"}>
                    <MyButton variant="contained" size="large" onClick={createUser} sx={{ backgroundColor: "#26a3af" }}>Register</MyButton>
                    <Button color="secondary" size="small" onClick={goLogin} sx={{ color: "#26a3af", fontWeight: "normal", width: 300 }}>I already have an account</Button>
                </Stack>

            </Stack> {/* END FRAME */}
        </MyBox>
    )
}

export default Register