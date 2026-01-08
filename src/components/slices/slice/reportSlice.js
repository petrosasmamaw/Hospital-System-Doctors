import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const CLIENTAPI_URL = `${API_BASE}/api/reports/`;

// Async Thunks
export const fetchAllReports = createAsyncThunk(
  "reports/fetchAll",
  async () => {
    const response = await axios.get(CLIENTAPI_URL);
    return response.data;
  }
);

export const fetchReportById = createAsyncThunk(
  "reports/fetchById",
  async (reportId) => {
    const response = await axios.get(`${CLIENTAPI_URL}${reportId}`);
    return response.data;
  }
);

export const fetchReportsByPatientId = createAsyncThunk(
  "reports/fetchByPatientId",
  async (patientId) => {
    const response = await axios.get(`${CLIENTAPI_URL}patient/${patientId}`);
    return response.data;
  }
);

export const fetchReportsByDoctorId = createAsyncThunk(
  "reports/fetchByDoctorId",
  async (doctorId) => {
    const response = await axios.get(`${CLIENTAPI_URL}doctor/${doctorId}`);
    return response.data;
  }
);

export const createReport = createAsyncThunk(
  "reports/create",
  async (reportData) => {
    const response = await axios.post(CLIENTAPI_URL, reportData);
    return response.data;
  }
);

export const updateReport = createAsyncThunk(
  "reports/update",
  async ({ reportId, updatedData }) => {
    const response = await axios.put(`${CLIENTAPI_URL}${reportId}`, updatedData);
    return response.data;
  }
);

export const deleteReport = createAsyncThunk(
  "reports/delete",
  async (reportId) => {
    await axios.delete(`${CLIENTAPI_URL}${reportId}`);
    return reportId;
  }
);

// Initial State
const initialState = {
  reports: [],
  loading: false,
  error: null,
};

// Slice
const reportSlice = createSlice({
  name: "reports",
  initialState,
 
  extraReducers: (builder) => {
    builder
      // Fetch all reports
      .addCase(fetchAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch report by ID
      .addCase(fetchReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reports.findIndex(r => r._id === action.payload._id);
        if (index !== -1) state.reports[index] = action.payload;
        else state.reports.push(action.payload);
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch reports by patient ID
      .addCase(fetchReportsByPatientId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsByPatientId.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReportsByPatientId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch reports by doctor ID
      .addCase(fetchReportsByDoctorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsByDoctorId.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReportsByDoctorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create report
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.push(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update report
      .addCase(updateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reports.findIndex(r => r._id === action.payload._id);
        if (index !== -1) state.reports[index] = action.payload;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete report
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(r => r._id !== action.payload);
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
