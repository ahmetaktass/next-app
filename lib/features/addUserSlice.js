import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = "https://dummyapi.io/data/v1";

export const createUser = createAsyncThunk(
  "addUser/createUser",
  async (userData) => {
    const response = await fetch(`${baseUrl}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "app-id": process.env.customKey,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Kullanıcı oluşturma işlemi başarısız oldu.");
    }

    return response.json();
  }
);

const addUserSlice = createSlice({
  name: "addUser",
  initialState: {
    loading: false,
    error: null,
    createdUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createdUser = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.createdUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addUserSlice.reducer;
