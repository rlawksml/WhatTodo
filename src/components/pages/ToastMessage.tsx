import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ToastMEssageProps {
  congrateState : boolean,
  setCongrateState: (state : boolean) => void,
  message ? : string,
}

const ToastMessage : React.FC<ToastMEssageProps> = ({ congrateState, setCongrateState, message = "모든 일을 완료했어요!!" }) => {
  
  const handleClose = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
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
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}


export default ToastMessage;