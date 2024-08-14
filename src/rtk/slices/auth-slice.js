import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(
      "https://tasktrial.vercel.app/login",
      data
    );
    toast.success("User Successfully Logged In", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Login Failed", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
    id: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.token = "";
        state.error = null;
        state.role = "";
        state.id = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token; // Adjust this based on the actual response structure
        state.role = action.payload.role;
        state.id = action.payload.id;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.token = "";
        state.role = "";
        state.id = "";
      });
  },
});

export default authSlice.reducer;
