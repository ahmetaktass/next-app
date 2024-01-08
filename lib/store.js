import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../lib/features/counterSlice";
import userReducer from "../lib/features/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
});
