import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Loginpage = () => {

	const [userInfo, setUserInfo] = useState(
		{
		email: "",
		password: ""
		}
	)
	
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		console.log('111', { e });
		const { name, value } = e.target
		console.log({ name, value });
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

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={() => {}}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleInputChange}
							value={userInfo.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
							value={userInfo.password}
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