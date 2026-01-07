import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/slice/authSlice";

export default function Navbar({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser());
		} catch (e) {}
		navigate("/login");
	};

	return (
		<nav className="site-nav">
			{user ? (
				<>
					<Link to="/">Home</Link>
					<Link to="/books">Books</Link>
					<Link to="/report">Reports</Link>
					<div style={{ flex: 1 }} />
					<span style={{ color: "var(--muted)" }}>Welcome, {user.name || user.email}</span>
                    <Link to="/profile">Profile</Link>
					<button className="logout-btn" onClick={handleLogout}>Logout</button>
				</>
			) : (
				<>
					<div style={{ flex: 1 }} />
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</>
			)}
		</nav>
	);
}
