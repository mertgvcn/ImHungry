import styled from "@emotion/styled"
import { Box, Typography, TextField, Button } from "@mui/material"

export const MyBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginTop: 60,
    width: 500,
    height: 470,
    backgroundColor: "#282e49",
    color : "white",
    borderRadius: 10
})

export const MyTypography = styled(Typography)({
    fontSize: 30,
    fontWeight: "bold"
})

export const MyTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px",
    width: 300,
})

export const MyButton = styled(Button)({
    width: 300,
    fontSize: 16,
    fontWeight: "bold"
})