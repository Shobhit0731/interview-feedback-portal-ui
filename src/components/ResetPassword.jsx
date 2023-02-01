import React, { useState } from "react";
import { LOGIN_USER, REGISTER_USER } from "./mutation";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const paperStyle = {
    padding: 20,
    height: "35vh",
    margin: "0 auto",
  };
  const btnstyle = { margin: "4px 0" };


  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/login");
  };

  return (
    <Grid>
      <Box
        sx={{
          width: 600,
          justifyContent: "center",
          mt: 13,
          ml: 45,
          border: "1px solid black",
        }}
      >
        <Paper elevation={0} style={paperStyle}>
          <Grid align="center"></Grid>
          <TextField
            variant="standard"
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            //   value={email}
            //   onChange={handleEmail}
          />

          <TextField
            variant="standard"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            sx={{ mt: 3, mb: 3 }}
            required
            //   value={password}
            //   onChange={handlePassword}
          />
          <TextField
            variant="standard"
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            sx={{ mt: 2, mb: 2 }}
            fullWidth
            required
            //   value={email}
            //   onChange={handleEmail}
          />
          <LoadingButton
            //   loading={loading}
            color="primary"
            align="center"
            variant="contained"
            style={btnstyle}
            fullWidth
              onClick={handleSubmit}
          >
            Reset Password
          </LoadingButton>
          <Typography sx={{ mt: 2 }}></Typography>
        </Paper>
      </Box>
    </Grid>
  );
};

export default ResetPassword;
