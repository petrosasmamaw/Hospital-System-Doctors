import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const CLIENTAPI_URL = `${API_BASE}/api/doctors/`;

// Fetch all doctors
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const response = await axios.get(CLIENTAPI_URL);
    return response.data;
  }
);

// Fetch doctor by ID
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchDoctorById",
  async (id) => {
    const response = await axios.get(`${CLIENTAPI_URL}${id}`);
    return response.data;
  }
);

// Fetch doctor by user ID
export const fetchDoctorByUserId = createAsyncThunk(
  "doctors/fetchDoctorByUserId",
  async (userId) => {
    const response = await axios.get(`${CLIENTAPI_URL}user/${userId}`);
    return response.data;
  }
);

// Create doctor with optional image upload
export const createDoctor = createAsyncThunk(
  "doctors/createDoctor",
  async (doctorData) => {
    let dataToSend = doctorData;

    if (doctorData.image instanceof File) {
      const formData = new FormData();
      for (const key of ["name","userId","title","status","specialization","education","description","phone","category"]) {
        formData.append(key, doctorData[key]);
      }
      // backend multer expects the file field named "Image"
      formData.append("Image", doctorData.image);
      dataToSend = formData;
    }

    const response = await axios.post(CLIENTAPI_URL, dataToSend, {
      headers: {
        "Content-Type": doctorData.image instanceof File ? "multipart/form-data" : "application/json",
      },
    });

    return response.data;
  }
);

// Update doctor with optional image upload
export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async ({ id, doctorData }) => {
    let dataToSend = doctorData;

    if (doctorData.image instanceof File) {
      const formData = new FormData();
      for (const key of ["name","userId","title","status","specialization","education","description","phone","category"]) {
        formData.append(key, doctorData[key]);
      }
      // backend multer expects the file field named "Image"
      formData.append("Image", doctorData.image);
      dataToSend = formData;
    }

    const response = await axios.put(`${CLIENTAPI_URL}${id}`, dataToSend, {
      headers: {
        "Content-Type": doctorData.image instanceof File ? "multipart/form-data" : "application/json",
      },
    });

    return response.data;
  }
);

// Update doctor status
export const updateDoctorStatus = createAsyncThunk(
  "doctors/updateDoctorStatus",
  async ({ id, status }) => {
    const response = await axios.put(`${CLIENTAPI_URL}status/${id}`, { status });
    return response.data;
  }
);

// Delete doctor
export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id) => {
    await axios.delete(`${CLIENTAPI_URL}${id}`);
    return id;
  }
);

// Initial state
const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

// Slice
const doctorSlice = createSlice({
  name: "doctors",
  initialState,
 
  extraReducers: (builder) => {
    builder
      // Fetch all doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch doctor by ID
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(doc => doc._id === action.payload._id);
        if (index !== -1) state.doctors[index] = action.payload;
        else state.doctors.push(action.payload);
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch doctor by user ID
      .addCase(fetchDoctorByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorByUserId.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(doc => doc._id === action.payload._id);
        if (index !== -1) state.doctors[index] = action.payload;
        else state.doctors.push(action.payload);
      })
      .addCase(fetchDoctorByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create doctor
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update doctor
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(doc => doc._id === action.payload._id);
        if (index !== -1) state.doctors[index] = action.payload;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update doctor status
      .addCase(updateDoctorStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(doc => doc._id === action.payload._id);
        if (index !== -1) state.doctors[index] = action.payload;
      })
      .addCase(updateDoctorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete doctor
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(doc => doc._id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default doctorSlice.reducer;
