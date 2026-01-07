import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// Images
import bone1 from "../../assets/Bone,joint&Muscle.jpg";
import book2 from "../../assets/book.jpg";
import brain from "../../assets/Brain&MentalHealth.jpg";
import digestive from "../../assets/Digestive&Stomach.jpg";
import doctors1 from "../../assets/doctors1.jpg";
import doctors2 from "../../assets/doctors2.jpg";
import heart from "../../assets/Heart&Circulation.jpg";
import hospital1 from "../../assets/hospital1.jpg";
import hospital2 from "../../assets/hospital2.jpg";
import hospital3 from "../../assets/hospital3.jpg";
import hospitalEmergency from "../../assets/hospitalEmergency.jpg";
import hospitalMain from "../../assets/hospitalMain.jpg";
import primaryDoctor from "../../assets/primaryDoctor.jpg";
import report from "../../assets/report.jpg";
import patient1 from "../../assets/patient1.jpg";

export default function Home() {
	const navigate = useNavigate();

	const cards = [
		{ title: "Primary Care", image: primaryDoctor, desc: "Continuity of care and routine check-ups." },
		{ title: "Cardiology", image: heart, desc: "Heart & circulation specialists." },
		{ title: "Orthopedics", image: bone1, desc: "Bone, joint and muscle care." },
		{ title: "Neurology", image: brain, desc: "Brain & mental health expertise." },
		{ title: "Gastroenterology", image: digestive, desc: "Digestive & stomach care." },
	];

	return (
		<div className="doctor-home">
			<motion.header
				className="doctor-hero"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<img src={hospitalMain} alt="hospital" className="hero-image" />
				<div className="hero-overlay">
					<motion.h1 initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
						Welcome to Our Doctor Portal
					</motion.h1>
					<motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
						Manage patients, view reports, and coordinate care using a modern,
						secure interface built for clinicians.
					</motion.p>
					<div className="hero-actions">
						<button className="btn-primary" onClick={() => navigate('/report')}>View Reports</button>
						<button className="btn-ghost" onClick={() => navigate('/books')}>My Appointments</button>
					</div>
				</div>
			</motion.header>

			<section className="doctor-cards">
				{cards.map((c, i) => (
					<motion.div key={i} className="doc-card" whileHover={{ y: -6 }} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
						<img src={c.image} alt={c.title} />
						<div className="doc-card-body">
							<h3>{c.title}</h3>
							<p>{c.desc}</p>
						</div>
					</motion.div>
				))}
			</section>

			<section className="doctor-gallery">
				<h2>Hospital Highlights</h2>
				<div className="gallery-grid">
					{[hospital1, hospital2, hospital3, hospitalEmergency, doctors1, doctors2, patient1, report, book2].map((img, i) => (
						<motion.img key={i} src={img} alt={`gallery-${i}`} whileHover={{ scale: 1.03 }} />
					))}
				</div>
			</section>
		</div>
	);
}
