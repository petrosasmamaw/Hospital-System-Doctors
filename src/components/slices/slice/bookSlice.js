import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CLIENTAPI_URL = "http://localhost:5000/api/books/";

// Async Thunks
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(CLIENTAPI_URL);
  return response.data;
});

export const fetchBooksByPatientId = createAsyncThunk(
  "books/fetchBooksByPatientId",
  async (patientId) => {
    const response = await axios.get(`${CLIENTAPI_URL}patient/${patientId}`);
    return response.data;
  }
);

export const fetchBooksByDoctorId = createAsyncThunk(
  "books/fetchBooksByDoctorId",
  async (doctorId) => {
    const response = await axios.get(`${CLIENTAPI_URL}doctor/${doctorId}`);
    return response.data;
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (bookData) => {
    const response = await axios.post(CLIENTAPI_URL, bookData);
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ bookId, updatedData }) => {
    const response = await axios.put(`${CLIENTAPI_URL}${bookId}`, updatedData);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    await axios.delete(`${CLIENTAPI_URL}${id}`);
    return id; // return id to remove locally
  }
);

// Slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch books by patient
      .addCase(fetchBooksByPatientId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksByPatientId.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooksByPatientId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch books by doctor
      .addCase(fetchBooksByDoctorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksByDoctorId.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooksByDoctorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create book
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.books[index] = action.payload;
        else state.books.push(action.payload);
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book._id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
