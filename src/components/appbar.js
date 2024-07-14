import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/pesto_logo.png'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { auth } from "../api/firebase"

const Header = (props) => {

    const { isLoggedIn, setIsLoggedIn } = props
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsLoggedIn(false)
            console.log('Sign out successful');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <>
            <AppBar position="fixed" sx= {{ zIndex: 1000, backgroundColor: "#1976d2" }}>
                <Toolbar>
                {/* <img src= {Logo} style={{ maxWidth: "92px", cursor: "pointer" }} onClick={() => { navigate("/") }} /> */}
                <h2 style= {{ cursor: "pointer" }} onClick={() => { navigate("/") }}>
                {/* <h2 style= {{ color: "#3bb19b", cursor: "pointer" }} onClick={() => { navigate("/") }}> */}
                    {`<|>esto`}
                </h2>
                <div style= {{ marginLeft: 'auto' }}>
                    {isLoggedIn ? (
                        // <Avatar sx= {{ backgroundColor: '#2196f3', color: '#fff', cursor: "pointer" }} onClick= {() => { console.log("Hii") }}>
                        //     <AccountCircleIcon fontSize="large" />
                        // </Avatar>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Box 
                            display= "flex"
                            alignItems= "center"
                            justifyContent= "space-around"
                        >
                            {/* <Button
                                variant="contained"
                                sx= {{ marginRight: "15px", padding: "5px 10px", borderRadius: "20px", width: "85px" }}
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button> */}
                            <Button sx= {{color: "white", marginRight: "15px", borderRadius: "20px", borderColor: "white"}} variant="text" onClick={() => navigate("/login")}>
                                Log In
                            </Button>
                            <Button sx= {{color: "white", marginRight: "15px", borderRadius: "20px", borderColor: "white"}} variant="text" onClick={() => navigate("/signup")}>Sign Up</Button>
                            {/* <Button 
                                variant="contained"
                                sx= {{ padding: "5px 10px", borderRadius: "20px", width: "85px" }}
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </Button> */}
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