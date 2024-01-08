"use client";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../lib/features/userSlice";
import { deleteUser } from "../../lib/features/deleteUserSlice";
import { createUser } from "../../lib/features/addUserSlice";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteUserDialog from "./DeleteUserDialog";
import { Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddUserDialog from "./AddUserDialog";

const Users = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.data);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Kullanıcı silme işlemleri
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

  // Kullanıcı arama işlemleri
  const filteredUsers = userData?.data.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Yeni kullanıcı ekleme işlemleri
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddUser = (newUser) => {
    try {
      dispatch(createUser(newUser));
      handleCloseAddDialog();
    } catch (error) {
      console.error("Kullanıcı eklenirken bir hata oluştu:", error);
    }
  };

  return (
    <>
      <div className="flex  gap-x-5 justify-center items-center w-1/2 mx-auto">
        <TextField
          className=" w-3/4 my-3"
          label="Kullanıcı Ara..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <SearchIcon color="action" sx={{ marginRight: 1 }} />,
          }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3468C0",
            color: "success",
            height: "50px",
          }}
          onClick={handleOpenAddDialog}
          endIcon={<PersonAddIcon />}
        >
          Ekle
        </Button>
      </div>

      <Grid container spacing={2}>
        {filteredUsers &&
          filteredUsers.map((user) => (
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
        <AddUserDialog
          open={openAddDialog}
          onClose={handleCloseAddDialog}
          onAddUser={handleAddUser}
        />
      </Grid>
    </>
  );
};

export default Users;
