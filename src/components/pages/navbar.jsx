import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/slice/authSlice";

export default function Navbar({ user }) {
    const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser());
		} catch (e) {}
		navigate("/login");
	};

	return (
		<nav className={`site-nav ${open ? "open" : ""}`}>
			<div className="nav-brand">
				<h1>Dengel Hospital</h1>
			</div>
			<button className={`hamburger ${open ? "is-active" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
				<span />
				<span />
				<span />
			</button>

			{user ? (
				<div className={`nav-items ${open ? "open" : ""}`}>
					<Link to="/">Home</Link>
					<Link to="/books">Books</Link>
					<Link to="/report">Reports</Link>
					<div style={{ flex: 1 }} />
					<span style={{ color: "var(--hosp-muted)" }}>Welcome, {user.name || user.email}</span>
					<Link to="/profile">Profile</Link>
					<button className="logout-btn" onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div className={`nav-items ${open ? "open" : ""}`}>
					<div style={{ flex: 1 }} />
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			)}
		</nav>
	);
}
