import React from "react";
import Snackbar from "@mui/joy/Snackbar";

const SnackBarMUI = ({
  open,
  autoHideDuration,
  variant,
  color,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      open={open}
      variant={variant}
      color={color}
      size={'lg'}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        onClose?.();
      }}
    >
      {message}
    </Snackbar>
  );
};

export default SnackBarMUI;
