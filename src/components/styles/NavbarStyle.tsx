import styled from "@emotion/styled"
import { AppBar, Typography } from "@mui/material"

export const MyAppBar = styled(AppBar)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    backgroundColor: "#06060f",
    fontSize: 20,
    width:"100%"
})

export const MyTypography = styled(Typography)({
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold"
})