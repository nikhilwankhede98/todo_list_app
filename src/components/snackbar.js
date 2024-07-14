import React from "react"
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open= false, message, handleClose= () => {}, snackbarType= "success" }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            message= {message}
            autoHideDuration={5000}
        >
            <Alert onClose={handleClose} severity= {snackbarType}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar
