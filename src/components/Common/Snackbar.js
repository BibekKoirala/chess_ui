import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { NotificationTypeEnum } from "../../Common/CommonEnum";

const CustomSnackbar = forwardRef((prop, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(NotificationTypeEnum.Success);

  useImperativeHandle(ref, () => ({
    showMessage: (message, type) => {
      setMessage(message);
      setType(type);
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      className={"Snackbarmain"}
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      action={[
        <IconButton onClick={handleClose}>
          <Close fontSize="30px" />
        </IconButton>,
      ]}
      onClose={handleClose}
    >
      <Alert
        className="Snackbarmessage"
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});

export default CustomSnackbar;
