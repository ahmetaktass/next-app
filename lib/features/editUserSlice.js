import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://dummyapi.io/data/v1";

export const updateUserById = createAsyncThunk(
  "editUser/updateUserById",
  async ({ userId, updatedUser }) => {
    const response = await axios.put(`${baseUrl}/user/${userId}`, updatedUser, {
      headers: {
        "Content-Type": "application/json",
        "app-id": process.env.customKey,
      },
    });
    return response.data;
  }
);

const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editUserSlice.reducer;
