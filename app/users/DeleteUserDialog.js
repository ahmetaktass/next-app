import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DeleteUserDialog = ({ open, onClose, onConfirm, name }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="bg-gray-200 text-red-500 font-bold">
        Delete User
      </DialogTitle>
      <DialogContent className="mt-5">
        <span className="font-bold mr-2">{name}</span>
        <span className="">
          adlı kullanıcıyı silmek istediğinizden emin misiniz?
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Vazgeç
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          style={{ backgroundColor: "#ff0000", color: "#fff" }}
        >
          Evet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
