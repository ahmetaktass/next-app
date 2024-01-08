import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default userSlice.reducer;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://dummyapi.io/data/v1/user", {
    headers: {
      "app-id": process.env.customKey,
    },
  });
  const data = await response.json();
  return data;
});
