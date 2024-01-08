import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditUserDialog = ({ open, onClose, onEditUser, userData }) => {
  const [editedUser, setEditedUser] = useState({});
  useEffect(() => {
    setEditedUser(userData);
  }, [userData]);

  const handleEditUser = () => {
    setEditedUser((prevEditedUser) => {
      onEditUser(prevEditedUser);
      onClose();
      return prevEditedUser;
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Kullanıcı Düzenle</DialogTitle>
      <DialogContent>
        <TextField
          label="Ad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editedUser?.firstName || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, firstName: e.target.value })
          }
        />
        <TextField
          label="Soyad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editedUser?.lastName || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, lastName: e.target.value })
          }
        />
        <TextField
          label="Ünvan"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editedUser?.title || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, title: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button
          onClick={handleEditUser}
          variant="contained"
          style={{
            backgroundColor: "#3468C0",
            color: "success",
          }}
        >
          Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
