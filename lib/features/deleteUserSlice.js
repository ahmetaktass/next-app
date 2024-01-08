import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteUserSlice.reducer;

export const deleteUser = createAsyncThunk(
  "deleteUser/deleteUser",
  async (userId) => {
    const response = await fetch(`https://dummyapi.io/data/v1/user/${userId}`, {
      method: "DELETE",
      headers: {
        "app-id": process.env.customKey,
      },
    });
    const data = await response.json();
    return data;
  }
);
