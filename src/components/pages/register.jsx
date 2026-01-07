import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/slice/authSlice";

export default function Register() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setMessage(null);
		try {
			const action = await dispatch(registerUser({ email, password }));
			if (action.error) {
				setError(action.error.message || "Registration failed");
			} else if (action.payload && action.payload.user) {
				setMessage("Registration successful");
			} else {
				setError("Unexpected response from server");
			}
		} catch (err) {
			setError(err.message || "Registration failed");
		}
	};

	return (
		<div>
			
			<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Register</h2>
                <p>Use this page to register as a doctor.</p>
				{error && <div className="error">{error}</div>}
				{message && <div className="success">{message}</div>}
				<label>Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<label>Password</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				<button type="submit">Register</button>
			</form>
			</div>
		</div>
	);
}
