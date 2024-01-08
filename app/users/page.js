"use client";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../lib/features/userSlice";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteUserDialog from "./DeleteUserDialog";

const Users = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.data);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUser(deleteUserId));
      dispatch(fetchUsers());
      setOpenDialog(false);
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {userData &&
        userData?.data.map((user) => (
          <Grid item xs={12} sm={6} lg={3} key={user.id}>
            <div className="flex items-center group bg-gray-100 p-5 rounded-md m-2 relative cursor-pointer">
              <Image
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">{user.title}</p>
                <DeleteIcon
                  sx={{
                    color: "red",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(user.id)}
                  className="absolute top-2 right-2 hidden group-hover:block "
                >
                  Sil
                </DeleteIcon>
                <EditIcon
                  sx={{
                    color: "blue",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  className="absolute top-10 right-2 hidden group-hover:block "
                >
                  Düzenle
                </EditIcon>
              </div>
            </div>
          </Grid>
        ))}
      <DeleteUserDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        name={
          userData?.data.find((user) => user.id === deleteUserId)?.firstName +
          " " +
          userData?.data.find((user) => user.id === deleteUserId)?.lastName
        }
      />
    </Grid>
  );
};

export default Users;
