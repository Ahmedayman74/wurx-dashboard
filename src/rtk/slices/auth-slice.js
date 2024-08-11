import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(
      "https://tasktrial.vercel.app/login",
      data
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    status: "idle",
    error: null,
    role: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.token = "";
        state.error = null;
        state.role = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token; // Adjust this based on the actual response structure
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.token = "";
        state.role = "";
      });
  },
});

export default authSlice.reducer;
