import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { auth } from "../../api/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { CustomSnackbar, Loader } from '../../components'

const Loginpage = ({ setIsLoggedIn, setIsLoading= () => {}, isLoading= false }) => {

	const navigate = useNavigate();

	const [userInfo, setUserInfo] = useState(
		{
			email: "",
			password: ""
		}
	)

	const { email, password } = userInfo
	
	const [error, setError] = useState("");

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

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setUserInfo({
			...userInfo,
			[name]: value
		})
	}

	const clearUserInfo = () => {
		setUserInfo({
			email: "",
			password: ""
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
			handleLogin()
		}
	}

	const handleLogin = async () => {
		setIsLoading(true)
		try {
			const response = await signInWithEmailAndPassword(auth, email, password)
			if (response?.user) {
				setIsLoading(false)
				setIsSnackbarOpen(true)
				setSnackbarMsg("User logged in successfully")
				setSnackbarType("success")
				setTimeout(() => {
					setIsLoggedIn(true)
					navigate('/todos')
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
			<div className={styles.login_container}>
				{isLoading ? 
					<Loader /> : (
					<div className={styles.login_form_container}>
						<div className={styles.left}>
							<form className={styles.form_container} onSubmit={handleSubmit}>
								<h1>Login to Your Account</h1>
								<input
									// type="email"
									placeholder="Email"
									name="email"
									onChange={handleInputChange}
									value={email}
									// required
									className={styles.input}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={handleInputChange}
									value={password}
									// required
									className={styles.input}
								/>
								{error && <div className={styles.error_msg}>{error}</div>}
								<button type="submit" className={styles.green_btn}>
									LOGIN
								</button>
							</form>
						</div>
						<div className={styles.right}>
							<h1>New Here ?</h1>
							<Link to="/signup">
								<button type="button" className={styles.white_btn}>
									SIGNUP
								</button>
							</Link>
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

export default Loginpage;