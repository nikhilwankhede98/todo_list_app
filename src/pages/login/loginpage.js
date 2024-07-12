import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { auth } from "../../api/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

const Loginpage = () => {

	const navigate = useNavigate();

	const [userInfo, setUserInfo] = useState(
		{
			email: "",
			password: ""
		}
	)

	const { email, password } = userInfo
	
	const [error, setError] = useState("");

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

	const handleSubmit = async (event) => {
		// navigate('/todos')
		event.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password)
			console.log('777', "account created");
		} catch (error) {
			console.log('777', { error });
		}
	}

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleInputChange}
							value={email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
							value={password}
							required
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
		</div>
	);
};

export default Loginpage;