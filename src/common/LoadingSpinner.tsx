import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
      <CircularProgress color="success" />
    </Box>
  );
};

export default LoadingSpinner;
