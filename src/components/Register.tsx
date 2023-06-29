import React from 'react'
import { useState } from "react"
import { loginProps } from '../types/UserType'
//MUI ELEMENTS
import { Stack, Divider, Button } from "@mui/material"
import { MyBox, MyTypography, MyTextField, MyButton, MyTextField2 } from './styles/RegisterStyle';
//DB
import { addDoc } from "firebase/firestore"



const Register = ({ userType, usersCollectionRef }: loginProps) => {

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

        if (firstName == "" || lastName == "" || email == "" || userName == "") {
            alert("Please dont leave blank spaces")
            return;
        }

        if (userType.some(user => user.userName === userName)) {
            alert("This username already selected from another user")
            setUserName("")
            return;
        }

        if (!(email.includes("@") && email.includes(".com"))) {
            alert("Please enter a valid mail")
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters")
            return;
        } else if (!stringHasNumber(password)) {
            alert("Password must contain at least one numeric value")
            return;
        }

        //Registration Successful
        await addDoc(usersCollectionRef, {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password
        })

        alert("Registration Successful!")
        window.location.href = "/"
    }



    return (
        <MyBox sx={{width: {xs: "100%", sm: "500px"}}}>
            {/* FRAME */}
            <Stack direction={"column"}>

                {/* HEADER */}
                <Stack direction={'column'} marginTop={3} spacing={1} alignItems={"center"}>
                    <MyTypography>Join Us</MyTypography>
                    <Divider sx={{ width: "100%", marginTop: 1, backgroundColor: 'white' }} />
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

// function stringHasNumber(text: String) {
//     if (!(text.includes("1") && text.includes("2") && text.includes("3") && text.includes("4") && text.includes("5") &&
//         text.includes("6") && text.includes("7") && text.includes("8") && text.includes("9") && text.includes("0"))) {
//         return false;
//     }
//     return true;
// }

function stringHasNumber(text: string): boolean { //yukarıdaki fonksiyonla aynı işlevi görüyor.
    return /\d/.test(text);
}

export default Register