import axios from "axios";
import { useSelector } from "react-redux";

const AxiosIntance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = useSelector((state) => state.auth.token.accessToken);
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": contentType,
      };
      return config;
    },
    (err) => Promise.reject(err)
  );
  axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
  ); // callback
  return axiosInstance;
};

export default AxiosIntance;
