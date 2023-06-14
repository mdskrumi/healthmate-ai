import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

const Loading: React.FC<{
  isLoading: boolean;
  handleClose?: React.MouseEventHandler<HTMLElement>;
}> = ({ isLoading, handleClose }) => {
  return isLoading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <></>
  );
};

export default Loading;
