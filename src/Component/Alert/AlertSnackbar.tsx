// components/AlertSnackbar.tsx
import { Alert, Snackbar } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void
  message: string;
  severity?: "success" | "error" | "info" | "warning";
  duration?: number;
};

const AlertSnackbar: React.FC<Props> = ({
  open,
  message,
  severity = "success",
  onClose
}) => {
  return (
    <Snackbar
      onClose={onClose}
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
