import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportsByDoctorId, createReport, updateReport } from "../slices/slice/reportSlice";
import { fetchBooksByPatientId, updateBook } from "../slices/slice/bookSlice";

export default function Room({ user }) {
	const [searchParams] = useSearchParams();
	const patientId = searchParams.get("patientId");
	const dispatch = useDispatch();
	const reports = useSelector((s) => s.reports.reports || []);
	const authUser = useSelector((s) => s.auth.user);
	const doctor = user || authUser;
	const doctorId = doctor ? (doctor._id || doctor.id) : null;

	const [text, setText] = useState("");
	const [currentReport, setCurrentReport] = useState(null);

	useEffect(() => {
		if (doctorId) dispatch(fetchReportsByDoctorId(doctorId));
	}, [doctorId, dispatch]);

	useEffect(() => {
		if (!patientId) return;
		const found = reports.find((r) => r.patientId === patientId);
		if (found) {
			setCurrentReport(found);
			setText(found.report || "");
		} else {
			setCurrentReport(null);
			setText("");
		}
	}, [patientId, reports]);

	const handleCreate = async () => {
		if (!doctorId || !patientId) return;
		await dispatch(createReport({ patientId, doctorId, report: text }));
		await dispatch(fetchReportsByDoctorId(doctorId));
	};

	const handleCreateAndCheckin = async () => {
		if (!doctorId || !patientId) return;
		// create report
		await dispatch(createReport({ patientId, doctorId, report: text }));
		await dispatch(fetchReportsByDoctorId(doctorId));

		try {
			// fetch bookings for this patient to find the booking for this doctor
			const booksForPatient = await dispatch(fetchBooksByPatientId(patientId)).unwrap();
			const bookToUpdate = (booksForPatient || []).find((b) => b.DoctorId === doctorId || b.DoctorId === doctorId);
			if (bookToUpdate) {
				await dispatch(updateBook({ bookId: bookToUpdate._id, updatedData: { status: "checkedIn" } }));
			}
		} catch (e) {
			console.error('Failed to set booking to checkedIn', e);
		}
	};

	const handleUpdate = async () => {
		if (!currentReport) return;
		await dispatch(updateReport({ reportId: currentReport._id, updatedData: { report: text } }));
		if (doctorId) await dispatch(fetchReportsByDoctorId(doctorId));
	};

	return (
		<div className="page">
			<h1>Room</h1>
			{!patientId ? (
				<div>Please provide a patientId in the query (e.g. ?patientId=...)</div>
			) : (
				<div className="doctor-profile-form">
					<div className="form-row">
						<label>Patient ID</label>
						<input value={patientId} readOnly />
					</div>
					<div className="form-row">
						<label>Doctor ID</label>
						<input value={doctorId || ""} readOnly />
					</div>
					<div className="form-row">
						<label>Report</label>
						<textarea className="doctor-profile-form textarea" value={text} onChange={(e) => setText(e.target.value)} />
					</div>
					<div className="form-actions">
						{currentReport ? (
							<button className="btn-primary" onClick={handleUpdate}>Update Report</button>
						) : (
							<button className="btn-primary" onClick={handleCreateAndCheckin}>Create Report</button>
						)}
					</div>
					{currentReport && (
						<div style={{ marginTop: 14 }}>
							<h3>Existing Report</h3>
							<div style={{ whiteSpace: "pre-wrap", background: "#fff", padding: 12, borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)" }}>{currentReport.report}</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
