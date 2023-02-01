import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const LoginStatus = () => {
  const paperStyle = {
    padding: 20,
    height: "35vh",
    margin: "0 auto",
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/login");
  };

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center"></Grid>

        <LoadingButton>Login Successfully</LoadingButton>
        <Typography sx={{ mt: 2 }}></Typography>
      </Paper>
    </Grid>
  );
};

export default LoginStatus;
