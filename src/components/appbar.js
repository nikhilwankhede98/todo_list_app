import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/pesto_logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = (props) => {

    const { isLoggedIn } = props
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="fixed" sx= {{ zIndex: 1000, backgroundColor: "white" }}>
                <Toolbar>
                {/* <img src= {Logo} style={{ maxWidth: "92px", cursor: "pointer" }} onClick={() => { navigate("/") }} /> */}
                <h2 style= {{ color: "#3bb19b", cursor: "pointer" }} onClick={() => { navigate("/") }}>
                    {`<|>esto`}
                </h2>
                <div style= {{ marginLeft: 'auto' }}>
                    {isLoggedIn ? (
                        <Avatar sx= {{ backgroundColor: '#2196f3', color: '#fff', cursor: "pointer" }} onClick= {() => { console.log("Hii") }}>
                            <AccountCircleIcon fontSize="large" />
                        </Avatar>
                    ) : (
                        <Box 
                            display= "flex"
                            alignItems= "center"
                            justifyContent= "space-around"
                        >
                            <Button
                                variant="contained"
                                sx= {{ marginRight: "15px", padding: "5px 10px", borderRadius: "20px", width: "85px" }}
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button>
                            <Button 
                                variant="contained"
                                sx= {{ padding: "5px 10px", borderRadius: "20px", width: "85px" }}
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    )}
                </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default Header