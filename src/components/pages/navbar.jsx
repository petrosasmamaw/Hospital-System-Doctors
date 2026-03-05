import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/slice/authSlice";

export default function Navbar({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser());
		} catch (e) {
			// ignore
		}
		navigate("/login");
	};

	const navItems = [
		{ to: "/", label: "Home", icon: "🏠" },
		{ to: "/books", label: "Appointments", icon: "📅" },
		{ to: "/report", label: "Reports", icon: "📊" },
		{ to: "/profile", label: "Profile", icon: "👤" },
	];

	return (
		<nav className="site-nav">
			<div className="sidebar-top">
				<div className="sidebar-logo">DENGEL DOCTOR</div>
				<div className="sidebar-menu">
					{user
						? navItems.map((item) => {
								const active = location.pathname === item.to;
								return (
									<Link key={item.to} to={item.to} className={`sidebar-item ${active ? "active" : ""}`}>
										<span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
										<span className="sidebar-label">{item.label}</span>
									</Link>
								);
							})
						: (
							<>
								<Link to="/login" className="sidebar-item">
									<span className="sidebar-icon" aria-hidden="true">🔑</span>
									<span className="sidebar-label">Login</span>
								</Link>
								<Link to="/register" className="sidebar-item">
									<span className="sidebar-icon" aria-hidden="true">📝</span>
									<span className="sidebar-label">Register</span>
								</Link>
							</>
						)}
				</div>
			</div>
			<div className="sidebar-bottom">
				{user && (
					<div className="sidebar-user">
						<div className="sidebar-avatar">{(user.name || user.email || "?").charAt(0).toUpperCase()}</div>
						<div className="sidebar-user-info">
							<p className="sidebar-user-name">{user.name || user.email}</p>
							<button type="button" className="sidebar-logout" onClick={handleLogout}>Logout</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
