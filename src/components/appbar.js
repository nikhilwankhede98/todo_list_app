import React from 'react'
import { AppBar, Toolbar, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <>
            <AppBar position="fixed" sx= {{ zIndex: 1000, backgroundColor: "#1976d2" }}>
                <Toolbar>
                <h2 style= {{ cursor: "pointer" }} onClick={() => { navigate("/") }}>
                    {`<|>esto`}
                </h2>
                <div style= {{ marginLeft: 'auto' }}>
                    {isLoggedIn ? (
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
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Box 
                            display= "flex"
                            alignItems= "center"
                            justifyContent= "space-around"
                        >
                            <Button sx= {{color: "white", marginRight: "15px", borderRadius: "20px", borderColor: "white"}} variant="text" onClick={() => navigate("/login")}>
                                Log In
                            </Button>
                            <Button sx= {{color: "white", marginRight: "15px", borderRadius: "20px", borderColor: "white"}} variant="text" onClick={() => navigate("/signup")}>Sign Up</Button>
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