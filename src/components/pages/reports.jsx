import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReportsByDoctorId } from '../slices/slice/reportSlice'

const Report = ({ user }) => {
  const dispatch = useDispatch()
  const { reports, loading, error } = useSelector((state) => state.reports)

  useEffect(() => {
    const doctorId = user?.id ?? user?._id
    if (!doctorId) return
    dispatch(fetchReportsByDoctorId(doctorId))
  }, [user, dispatch])

  return (
    <div className="reports-root page">
      <div className="books-header">
        <h1>My Reports</h1>
        <p className="books-sub">Reports created by you</p>
        <p className="reports-sub-detail">
          A report captures clinical observations, diagnostic results, and
          recommended follow-ups — concise, verified notes you authored to
          document patient care and progress.
        </p>
      </div>

      {loading && <p>Loading reports…</p>}
      {error && <div className="auth-form error">{error}</div>}

      {!loading && !error && reports.length === 0 && (
        <p className="books-sub">No reports found.</p>
      )}

      <div className="reports-list">
        {reports.map((r) => (
          <div key={r._id || r.id} className="report-card book-item">
            <div className="book-main">
              <div className="book-date">{new Date(r.createdAt || r.updatedAt).toLocaleString()}</div>
              <div className="book-patient">Patient ID: <span className="book-patient-name">{r.patientId}</span></div>
              <div className="book-notes report-box">{r.report}</div>
            </div>
          </div>
        ))}
      </div>
      <section className="reports-footer">
        <p className="footer-text">
          Reports are secure clinical records containing observations,
          diagnoses, and treatment recommendations — review them here and
          reach out to the care team for clarifications or follow-up actions.
        </p>
      </section>
    </div>
  )
}

export default Report
