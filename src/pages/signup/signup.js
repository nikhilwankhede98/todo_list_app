import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { auth } from "../../api/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CustomSnackbar, Loader } from '../../components'

const SignupPage = ({ setIsLoading = () => {}, isLoading= false }) => {
	const [userInfo, setUserInfo] = useState(
        {
          email: "",
          password: ""
        }
    )

	const { email, password } = userInfo
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState("");
	const [snackbarType, setSnackbarType] = useState("");

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
		return;
		}
		setSnackbarMsg("")
		setSnackbarType("")
		setIsSnackbarOpen(false);
	};

	const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserInfo({
          ...userInfo,
          [name]: value
        })
    }
	const handleSubmit = (event) => {
		event.preventDefault();
		if ((email === "" || password === "")) {
			setIsSnackbarOpen(true)
			setSnackbarMsg("Please enter your email and password")
			setSnackbarType("error")
		} else {
			handleSnackbarClose()
			handleSignup()
		}
	}

	const handleSignup = async () => {
		setIsLoading(true)
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			if (response?.user) {
				setIsLoading(false)
				setIsSnackbarOpen(true)
				setSnackbarMsg("User created in successfully")
				setSnackbarType("success")
				setTimeout(() => {
					setIsLoading(false)
					navigate('/login')
				}, 1000)
			}
		} catch (error) {
			console.log('777', { error });
			setIsLoading(false)
			if (error) {
				setIsSnackbarOpen(true)
				setSnackbarMsg("Please enter a valid email and password")
				setSnackbarType("error")
			}
		}
	}

	return (
		<>
			<div className={styles.signup_container}>
				{isLoading ?
					<Loader /> : (
						<div className={styles.signup_form_container}>
							<div className={styles.left}>
								<h1>Welcome Back</h1>
								<Link to="/login">
									<button type="button" className={styles.white_btn}>
										LOGIN
									</button>
								</Link>
							</div>
							<div className={styles.right}>
								<form className={styles.form_container} onSubmit={handleSubmit}>
									<h1>Create Account</h1>
									<input
										placeholder="Email"
										name="email"
										onChange={handleInputChange}
										value={userInfo.email}
										className={styles.input}
									/>
									<input
										type="password"
										placeholder="Password"
										name="password"
										onChange={handleInputChange}
										value={userInfo.password}
										className={styles.input}
									/>
									<button type="submit" className={styles.green_btn}>
										SIGNUP
									</button>
								</form>
							</div>
						</div>
					)
				}
			</div>
			<CustomSnackbar
				open={isSnackbarOpen}
				handleClose={handleSnackbarClose}
				message={snackbarMsg}
				snackbarType= {snackbarType}
			/>
		</>
	);
};

export default SignupPage;