import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  console.log(user);
  try {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: "http://localhost:3000/cpanel/login",
      method: "POST",
      headers: headersList,
      data: user,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);

    // const res = await axios.post("/cpanel/login", user);
    dispatch(loginSuccess(response.data.user));
    navigate(`/cpanel/dashboard`);
  } catch (error) {
    dispatch(loginFailed());
  }
};
