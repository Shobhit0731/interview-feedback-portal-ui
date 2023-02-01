import React, { useState } from "react";
import { REGISTER_USER } from "./mutation";
import { useMutation } from "@apollo/client";

import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
} from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Signup = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "35vh",
    margin: "0 auto",
  };
  const btnstyle = { margin: "4px 0" };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
  });



  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);

  const hasErrors = (errors) => {
  console.log(errors)
  return  Object.keys(errors).length !== 0};

  const handleError = (formValues) => {
    const { name: newName, email: newEmail, password: newPassword } = formValues;


    validationSchema
      .validate(
        {
          name: newName,
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
      name,email, password,
    });
  }

  const isTouched = (touched) => Object.keys(touched).length !== 0;


  const onChangeHandler = (field, event) => {
    if (field === "name") {
      setName(event.target.value);
    }

    if (field === "email") {
      setEmail(event.target.value);
    }
    if (field === "password") {
      setPassword(event.target.value);
    }
    handleError({
      name,
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

  // const handleName = (event) => {
  //   setName(event.target.value);
  // };

  const [signUpUser, { loading }] = useMutation(REGISTER_USER, {
     onCompleted: (result) => {
      console.log('RESULT')
      localStorage.setItem("token", result.loginUser.token);
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("Token", localStorage);
    if(localStorage.token) {
      try{
        const {data} = await signUpUser({
          variables: {
            payload: {
              name,
              email,
              password,
            },
          },
        });
        if(data){
          navigate("/login");
      }
    }
    catch(error){
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
            // handleSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  label="Name"
                  sx={{mb:1}}
                  name="name"
                  value={name}
                  onBlur={(event) => { onBlurHandler('name', event); }}
                  onChange={(event) => {
                    onChangeHandler("name", event);
                  }}  

                  placeholder="Enter name"
                  fullWidth
                  required
                  error={
                    touched.name && getError(touched, error, "name") !== ""
                  }
                  helperText={getError(touched, error, "email")}
                />

                <Field
                  as={TextField}
                  label="Email"
                  sx={{mb:1}}
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
                  sx={{mb:1}}
                  name="password"
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

                <LoadingButton
                  sx={{ mt: 1 }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={hasErrors(error) || !isTouched(touched)}
                  handloading={loading}
                  style={btnstyle}
                  fullWidth
                >
                  Sign in
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Signup;
