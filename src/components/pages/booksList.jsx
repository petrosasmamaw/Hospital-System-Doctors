import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import book2 from "../../assets/book.jpg";
import { motion } from "framer-motion";
import { fetchBooks, fetchBooksByDoctorId, updateBook } from "../slices/slice/bookSlice";
import { getPatientByUserId } from "../slices/slice/patientSlice";

export default function BooksList({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const books = useSelector((s) => s.books.books || []);
	const patients = useSelector((s) => s.patients.patients || []);

	useEffect(() => {
		if (user && (user._id || user.id)) {
			const doctorId = user._id || user.id;
			dispatch(fetchBooksByDoctorId(doctorId));
		} else {
			dispatch(fetchBooks());
		}
	}, [user, dispatch]);

	useEffect(() => {
		const loadPatients = async () => {
			if (!books || books.length === 0) return;
			await Promise.all(
				books.map(async (b) => {
					try {
						const already = patients.find((p) => p.userId === b.patientId);
						if (!already) {
							await dispatch(getPatientByUserId(b.patientId)).unwrap();
						}
					} catch (e) {
					}
				})
			);
		};
		loadPatients();
	}, [books, patients, dispatch]);

	const renderPatientFor = (book) => {
		const p = patients.find((x) => x.userId === book.patientId);
		if (!p) return <div className="book-patient">Patient data not loaded</div>;
		return (
			<div>
				<div className="book-patient-name">{p.name}</div>
				<div className="book-patient-meta">Age: {p.age || "—"} • {p.gender || "—"}</div>
				<div className="book-patient-meta">Phone: {p.phone}</div>
				<div className="book-patient-meta">Blood: {p.bloodType}</div>
			</div>
		);
	};

	return (
		<div className="books-list-root">
			<div className="doctor-hero">
				<img className="hero-image" src={book2} alt="books hero" />
				<div className="hero-overlay">
					<h1>Bookings Overview</h1>
					<p>
						This section shows recent bookings made by patients. For each booking
						the patient's profile is retrieved (name, age, contact, blood
						type) so doctors can quickly review key information before the
						appointment.
					</p>
				</div>
			</div>

			<div className="books-header" style={{ margin: "1.2rem 1.5rem 0" }}>
				<h1>My Bookings</h1>
				<div className="books-sub">A quick list of recent patient bookings</div>
			</div>

			<div className="books-list">
					<div className="books-grid doctor-books-grid">
					{books && books.length ? (
						books.map((book) => (
							<motion.div
								key={book._id}
								className="book-item doctor-book-item"
								whileHover={{ y: -4 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<div className="book-main">
									<div className="book-date">{new Date(book.createdAt).toLocaleString()}</div>
									{renderPatientFor(book)}
									<div className="book-notes">Booking ID: {book._id}</div>
								</div>
								<div className="book-status-wrap">
									{(() => {
										const raw = book.status;
										const normalized = raw ? raw.toLowerCase() : null;
										const mapping = {
											checkedin: "Checked In",
											waiting: "Waiting",
											inprogress: "In Progress",
											"in-progress": "In Progress",
										};
										const label = normalized ? mapping[normalized] || raw : "New feature update";
										const cls = normalized ? normalized.replace(/\s+/g, "") : "feature-update";
										return <div className={`status ${cls}`}>{label}</div>;
									})()}
								</div>
								<div className="book-actions">
														<button
															className="btn-primary"
															onClick={async () => {
																try {
																	// optimistically update booking status to inProgress
																	await dispatch(updateBook({ bookId: book._id, updatedData: { status: "inProgress" } })).unwrap();
																} catch (e) {
																	console.error('Failed to update booking status', e);
																}
																navigate(`/room?patientId=${book.patientId}`);
															}}
														>
															Create Room
														</button>
								</div>
							</motion.div>
						))
					) : (
						<div style={{ padding: 18, color: "var(--hosp-muted)" }}>No bookings found.</div>
					)}
				</div>
			</div>
		</div>
	);
}