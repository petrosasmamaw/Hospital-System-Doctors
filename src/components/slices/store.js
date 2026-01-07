import { configureStore } from "@reduxjs/toolkit";

import reportReducer from "./slice/reportSlice";
import patientReducer from "./slice/patientSlice";
import doctorReducer from "./slice/doctorSlice";
import bookReducer from "./slice/bookSlice";
import authReducer from "./slice/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        reports: reportReducer,
        patients: patientReducer,
        doctors: doctorReducer,
        books: bookReducer,
    },
});

export default store;