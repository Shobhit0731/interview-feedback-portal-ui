import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, backgroundColor: "" }}
        >
          Feedback Portal
        </Typography>
        <Button>
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">
            Login
          </Link>
        </Button>
        <Button>
          <Link style={{ color: "white", textDecoration: "none" }} to="/Signup">
            Singup
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
