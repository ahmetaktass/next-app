import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../lib/features/counterSlice";
import userReducer from "../lib/features/userSlice";
import deleteUserReducer from "../lib/features/deleteUserSlice";
import addUserReducer from "../lib/features/addUserSlice";
import editUserReducer from "../lib/features/editUserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    deleteUser: deleteUserReducer,
    addUser: addUserReducer,
    editUser: editUserReducer,
  },
});
