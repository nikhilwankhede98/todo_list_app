import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { auth } from "../../api/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupPage = () => {
	const [userInfo, setUserInfo] = useState(
        {
          email: "",
          password: ""
        }
    )

	const { email, password } = userInfo
	const [error, setError] = useState("");
	const navigate = useNavigate();

    const handleInputChange = (e) => {
        console.log('111', { e });
        const { name, value } = e.target
        console.log({ name, value });
        setUserInfo({
          ...userInfo,
          [name]: value
        })
    }

	const handleSubmit = async (event) => {
		// navigate('/todos')
		event.preventDefault();
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			if (response?.user) navigate('/login')
			console.log('777', { response }, "account created new");
		} catch (error) {
			console.log('777', { error });
		}
	}

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = "http://localhost:8080/api/users";
	// 		const { data: res } = await axios.post(url, data);
	// 		navigate("/login");
	// 		console.log(res.message);
	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };

	return (
		<div className={styles.signup_container}>
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
							SIGNUP
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;