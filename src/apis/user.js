import axios from "axios";
import { Base_Url } from "./baseurl";

export const Login = async (data) => {
  try {
    const response = await axios.post(`${Base_Url.base_url}/login`, data);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};

export const getUserDetails = async (telegramId) => {
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/userDetails}/${telegramId}`
    );

    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};


export default {
  Login,
  getUserDetails,
};
