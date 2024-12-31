import axios from "axios";
import { apiUrl } from "../configs/apiUrl";
export const register = async (formData) => {
  const response = await axios.post(`${apiUrl}account/register`, formData);
  return response;
};
export const login = async (formData) => {
  const response = await axios.post(`${apiUrl}account/login`, formData, {
    withCredentials: true,
  });
  return response;
};
