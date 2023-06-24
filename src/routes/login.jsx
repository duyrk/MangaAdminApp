import { Form, useNavigate } from "react-router-dom";
import "../styles/login.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  ThemeProvider,
  makeStyles,
} from "@mui/material";
import { myTheme } from "../assets/MyTheme";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../assets/redux/apiRequest";
import { useDispatch } from "react-redux";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [handleUsername, sethandleUsername] = useState("")
const [handlePassword, sethandlePassword] = useState("")
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogin = (e)=>{
  e.preventDefault();
    const newUser = {
        user_name: handleUsername,
        password: handlePassword
    }
    console.log(newUser);
     loginUser(newUser, dispatch, navigate);
}
  return (
    <ThemeProvider theme={myTheme}>
      <div className="container">
        <div className="welcomeText">Login to Control Panel</div>
        <div className="loginContainer">
          <img
            className="loginBackGround"
            src="../assets/loginBanner.jpg"
            alt=""
          />
          <Form className="login-form" onSubmit={handleLogin}>
            {/* <input placeholder="Username" className="loginInput" type="text"></input>
                <input placeholder="Username" className="loginInput" type="password"></input> */}

            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={(e)=>{sethandleUsername(e.target.value)}}
            />
            <FormControl sx={{ marginTop: "20px" }} variant="standard" >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e)=>{sethandlePassword(e.target.value)}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              sx={{ marginTop: "50px" }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Form>
        </div>
        <div className="footer">Powered by raiko</div>
      </div>
    </ThemeProvider>
  );
}
