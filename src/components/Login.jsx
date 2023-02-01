import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./mutation";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "35vh",
    margin: "0 auto",
  };
  const btnstyle = { margin: "4px 0" };

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string(6).required("Password is required"),
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);
  const [showPassword, setShowPassword] = useState(false);


  const hasErrors = (errors) => {
    console.log(errors)
   return  Object.keys(errors).length !== 0};

  const handleError = (formValues) => {
    const { email: newEmail, password: newPassword } = formValues;


    validationSchema
      .validate(
        {
          email: newEmail,
          password: newPassword,
        },
        { abortEarly: false }
      )
      .then(() => {
        setError({});
      })
      .catch((errors) => {
        const schemaErrors = {};
        if (errors) {
          errors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setError(schemaErrors);
        }
      });
  };

  const getError = (touched, errors, field) => {
    if (touched[field]) {
      return errors[field] || "";
    }
    return null;
  };

  const onBlurHandler = (field) => {
    touched[field] = true;
    setTouched(touched);
    handleError({
      email, password,
    });
  }

  const isTouched = (touched) => Object.keys(touched).length !== 0;


  const onChangeHandler = (field, event) => {
    if (field === "email") {
      setEmail(event.target.value);
    }
    if (field === "password") {
      setPassword(event.target.value);
    }
    handleError({
      email,
      password,
    });
  };

  // const handleEmail = (event) => {
  //   setEmail(event.target.value);
  // };
  // const handlePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (result) => {
      console.log('RESULT')
      localStorage.setItem("token", result.loginUser.token);
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("Token", localStorage);
    if (localStorage.token) {
      console.log('if',localStorage.token)
      try{
      
      const {data} =   await loginUser({
          variables: {
            payload: {
              email,
              password,
            },
          },
        });
        if(data){
          navigate("/loginStatus");
        }
      }
      catch(error){
        alert("Invalid User Details")
        console.log("error")
      }
    }
  };
  return (
    <Grid>
      <Box
        sx={{
          width: 600,
          justifyContent: "center",
          mt: 10,
          ml: 45,
          border: "1px solid black",
        }}
      >
        <Paper style={paperStyle}>
          <Grid align="center"></Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  value={email}
                  onBlur={(event) => { onBlurHandler('email', event); }}
                  onChange={(event) => {
                    onChangeHandler("email", event);
                  }}
                  placeholder="Enter email"
                  fullWidth
                  required
                  error={
                    touched.email && getError(touched, error, "email") !== ""
                  }
                  helperText={getError(touched, error, "email")}
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  sx={{ mt: 1 }}
                  value={password}
                  onBlur={(event) => { onBlurHandler('password', event); }}
                  onChange={(event) => {
                    onChangeHandler("password", event);
                  }}
                  error={
                    touched.email && getError(touched, error, "password") !== ""
                  }
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  helperText={getError(touched, error, "password")}
                />
                <Field
                  as={FormControlLabel}
                  name="remember"
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={hasErrors(error) || !isTouched(touched)}
                  handloading={loading}
                  style={btnstyle}
                  fullWidth
                >
                  {" "}
                  Sign in
                </LoadingButton>
              </Form>
            )}
          </Formik>
          <Typography>
            <Button>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/resetPassword"
              >
                Reset-Password ?{" "}
              </Link>
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Login;
