import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ToastMessage({ congrateState, setCongrateState }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCongrateState(false);
  };

  return (
    <div>
      <Snackbar
        open={congrateState}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          모든 일을 완료했어요!!
        </Alert>
      </Snackbar>
    </div>
  );
}
