import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSession } from "./components/slices/slice/authSlice";

import BooksList from "./components/pages/booksList.jsx";
import Home from "./components/pages/home.jsx";
import Room from "./components/pages/room.jsx";
import Login from "./components/pages/login.jsx";
import Register from "./components/pages/register.jsx";
import Navbar from "./components/pages/navbar.jsx";
import Profile from "./components/pages/profile.jsx";
import Report from "./components/pages/reports.jsx";

function AppRoutes({ user }) {
	return (
		<Routes>
			<Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" replace />} />
			<Route path="/books" element={user ? <BooksList user={user} /> : <Navigate to="/login" replace />} />
			<Route path="/room" element={user ? <Room user={user} /> : <Navigate to="/login" replace />} />
			<Route path="/report" element={user ? <Report user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" replace />} />
			<Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
			<Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
		</Routes>
	);
}

export default function AppWrapper() {
	return (
		<BrowserRouter>
			<AppInner />
		</BrowserRouter>
	);
}

function AppInner() {
	const dispatch = useDispatch();
	const auth = useSelector((s) => s.auth || { user: null, status: "idle" });
	const [user, setUser] = useState(auth.user || null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	useEffect(() => {
		setUser(auth.user || null);
	}, [auth.user]);

	useEffect(() => {
		if (auth.status === "succeeded") {
			if (auth.user) {
				if (location.pathname === "/login" || location.pathname === "/register") navigate("/");
			} else {
				if (location.pathname !== "/login" && location.pathname !== "/register") navigate("/login");
			}
		}
	}, [auth.status, auth.user, location.pathname, navigate]);

	return (
		<div>
			<Navbar user={user} />
			<main style={{ padding: 20 }}>
				<AppRoutes user={user} />
			</main>
		</div>
	);
}
