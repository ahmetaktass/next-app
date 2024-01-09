// DeletePostDialog.js

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DeletePostDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="bg-gray-200 text-red-500 font-bold">
        Post&apos;u Sil
      </DialogTitle>
      <DialogContent className="my-10  items-center">
        <p>Post&apos;u silmek istediğinize emin misiniz?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Vazgeç
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ff0000", color: "#fff" }}
          onClick={onDelete}
          color="error"
        >
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostDialog;
