import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddUserDialog = ({ open, onClose, onAddUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = () => {
    onAddUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
      <DialogContent>
        <TextField
          label="Ad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Soyad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="E-posta"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button
          onClick={handleAddUser}
          variant="contained"
          style={{
            backgroundColor: "#3468C0",
            color: "success",
            height: "50px",
          }}
        >
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
