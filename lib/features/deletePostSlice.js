import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const deletePostSlice = createSlice({
  name: "deletePost",
  initialState: {
    loading: "idle",
    error: null,
    deletedPostId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePostById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.deletedPostId = action.payload.id;
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});
export default deletePostSlice.reducer;

export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (postId) => {
    const response = await fetch(`https://dummyapi.io/data/v1/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "app-id": process.env.customKey,
      },
    });

    if (!response.ok) {
      throw new Error("Post deletion failed");
    }

    const data = await response.json();
    return data;
  }
);
