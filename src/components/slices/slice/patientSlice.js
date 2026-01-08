import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const CLIENTAPI_URL = `${API_BASE}/api/patients/`;

// Async Thunks
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(CLIENTAPI_URL);
    return response.data;
  }
);

export const getPatientsById = createAsyncThunk(
  "patients/getPatientsById",
  async (id) => {
    const response = await axios.get(`${CLIENTAPI_URL}${id}`);
    return response.data;
  }
);

export const getPatientByUserId = createAsyncThunk(
  "patients/getPatientByUserId",
  async (userId) => {
    const response = await axios.get(`${CLIENTAPI_URL}user/${userId}`);
    return response.data;
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ id, patientData }) => {
    const response = await axios.put(`${CLIENTAPI_URL}${id}`, patientData);
    return response.data;
  }
);

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (patientData) => {
    const response = await axios.post(CLIENTAPI_URL, patientData);
    return response.data;
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id) => {
    await axios.delete(`${CLIENTAPI_URL}${id}`);
    return id;
  }
);

// Initial State
const initialState = {
  patients: [],
  loading: false,
  error: null,
};

// Slice
const patientSlice = createSlice({
  name: "patients",
  initialState,
  
  extraReducers: (builder) => {
    builder
      // Fetch all patients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch patient by ID
      .addCase(getPatientsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatientsById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.patients[index] = action.payload;
        else state.patients.push(action.payload);
      })
      .addCase(getPatientsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch patient by user ID
      .addCase(getPatientByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatientByUserId.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.patients[index] = action.payload;
        else state.patients.push(action.payload);
      })
      .addCase(getPatientByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create patient
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.patients[index] = action.payload;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete patient
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.filter(p => p._id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default patientSlice.reducer;
