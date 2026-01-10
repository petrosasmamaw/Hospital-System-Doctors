import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page footer-grid">
        <div className="footer-col">
          <h3>Dengel Doctor's Portal</h3>
          <p className="muted">Tools for scheduling, reports and patient management with secure access.</p>
          <p className="muted" style={{ marginTop: 8 }}>Version 1.0 • Doctor interface</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p className="muted">Email: <a href="mailto:doctor@hospital.com">doctor@hospital.com</a></p>
          <p className="muted">Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          <p className="muted">Address: 123 Health St., Care City</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/books">Books</a></li>
            <li><a href="/report">Reports</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="page">
          <small className="muted">© {new Date().getFullYear()} Hospital. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
