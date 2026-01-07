import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { fetchDoctorByUserId, createDoctor, updateDoctor } from "../slices/slice/doctorSlice";

export default function Profile({ user }) {
    const dispatch = useDispatch();
    const doctorsState = useSelector((s) => s.doctors || { doctors: [], loading: false, error: null });

    const userId = user && (user.id || user._id);

    useEffect(() => {
        if (userId) dispatch(fetchDoctorByUserId(userId));
    }, [dispatch, userId]);

    const doctor = doctorsState.doctors.find((d) => d.userId === userId) || null;

    const [form, setForm] = useState({
        name: "",
        title: "",
        status: "inactive",
        specialization: "",
        education: "",
        description: "",
        phone: "",
        category: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (doctor) {
            setForm({
                name: doctor.name || "",
                title: doctor.title || "",
                status: doctor.status || "inactive",
                specialization: doctor.specialization || "",
                education: doctor.education || "",
                description: doctor.description || "",
                phone: doctor.phone || "",
                category: doctor.category || "",
            });
            setImagePreview(doctor.image || null);
        }
    }, [doctor]);

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onImageChange = (e) => {
        const f = e.target.files && e.target.files[0];
        setImageFile(f || null);
        if (f) setImagePreview(URL.createObjectURL(f));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await submitPayload(form.status);
    };

    const submitPayload = async (statusOverride) => {
        if (!userId) return window.alert("You must be logged in.");
        const payload = { ...form, userId };
        if (statusOverride) payload.status = statusOverride;
        if (imageFile) payload.image = imageFile;

        try {
            if (doctor) {
                await dispatch(updateDoctor({ id: doctor._id, doctorData: payload })).unwrap();
                window.alert("Profile updated successfully");
            } else {
                await dispatch(createDoctor(payload)).unwrap();
                window.alert("Profile created successfully");
            }
        } catch (err) {
            console.error(err);
            window.alert("Operation failed: " + (err?.message || err));
        }
    };

    const handleSaveDraft = async () => {
        await submitPayload('inactive');
    };

    return (
        <div className="doctor-profile-root">
            <motion.header initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="doctor-profile-header">
                <h1>{doctor ? "My Doctor Profile" : "Create Your Doctor Profile"}</h1>
                <p className="profile-sub">Provide your professional details so patients can find you.</p>
            </motion.header>

            <main className="doctor-profile-main">
                <form className={`doctor-profile-form ${doctor && doctor.status !== 'active' ? 'pending' : ''}`} onSubmit={onSubmit}>
                    {doctor && (
                        <div className="doctor-top">
                            {imagePreview ? (
                                <img src={imagePreview} alt="profile" className="doctor-image" />
                            ) : (
                                <div className="doctor-image placeholder">No image</div>
                            )}
                            <div className="doctor-top-meta">
                                <div className={`doctor-status ${doctor.status === 'active' ? 'active' : 'pending'}`}>
                                    {doctor.status}
                                </div>
                                <div className="doctor-name">{doctor.name}</div>
                                <div className="doctor-cat">{doctor.category}</div>
                            </div>
                        </div>
                    )}
                    <div className="form-row">
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={onChange} required />
                    </div>

                    <div className="form-row">
                        <label>Title</label>
                        <input name="title" value={form.title} onChange={onChange} required />
                    </div>

                    <div className="form-row">
                        <label>Specialization</label>
                        <input name="specialization" value={form.specialization} onChange={onChange} required />
                    </div>

                    <div className="form-row">
                        <label>Education</label>
                        <input name="education" value={form.education} onChange={onChange} required />
                    </div>

                    <div className="form-row">
                        <label>Phone</label>
                        <input name="phone" value={form.phone} onChange={onChange} required />
                    </div>

                    <div className="form-row">
                        <label>Category</label>
                        <select name="category" value={form.category} onChange={onChange} required>
                            <option value="">Select</option>
                            <option value="Primary">Primary</option>
                            <option value="Bone, Joint & Muscle">Bone, Joint & Muscle</option>
                            <option value="Heart & Circulation">Heart & Circulation</option>
                            <option value="Brain & Mental Health">Brain & Mental Health</option>
                            <option value="Digestive & Stomach">Digestive & Stomach</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label>Status</label>
                        <select name="status" value={form.status} onChange={onChange}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-row full">
                        <label>Description / Bio</label>
                        <textarea name="description" value={form.description} onChange={onChange} required />
                    </div>

                    <div className="form-row">
                        <label>Profile Image</label>
                        <input type="file" accept="image/*" onChange={onImageChange} />
                    </div>

                    <div className="form-actions">
                        <button className="btn-primary" type="submit">{doctor ? "Update Profile" : "Create Profile"}</button>
                        <button type="button" className="btn-ghost" onClick={handleSaveDraft}>Save Draft</button>
                    </div>
                </form>
            </main>
        </div>
    );
}
