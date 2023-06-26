import axios from "axios";
import {
  accessToken,
  loginFailed,
  loginStart,
  loginSuccess,
} from "./authSlice";
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
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
    try {
      let response = await axios.request(reqOptions);
      console.log(response.data);
      dispatch(loginSuccess(response.data.user));
      dispatch(accessToken(response.data.accessToken));
      navigate(`/cpanel/dashboard`);
    } catch (error) {
      console.log("Call login error" + error);
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};
