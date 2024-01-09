import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const postListSlice = createSlice({
  name: "postList",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default postListSlice.reducer;

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://dummyapi.io/data/v1/post?limit=10", {
    headers: {
      "app-id": process.env.customKey,
    },
  });
  const data = await response.json();
  return data.data;
});
