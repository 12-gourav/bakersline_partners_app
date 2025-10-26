import axios from "axios";
import Toast from "react-native-toast-message";

const url = "https://www.api.bakersline.in/api/v1";

const ErrorMsg = (e) => {
  console.log(e);
  Toast.show({
    type: "error",
    text1: "Oops!",
    text2: e?.response?.data?.msg,
  });
};

export const RegisterAPI = async (myform) => {
  try {
    return await axios.post(url + "/register/shop", myform, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const VerifyUserAPI = async (email, otp) => {
  try {
    return await axios.get(url + "/verify/shop", {
      params: {
        email,
        otp,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const LoginAPI = async (email, password) => {
  try {
    return await axios.post(url + "/login/shop", {
      email,
      password,
    });
  } catch (error) {
    ErrorMsg(error);
  }
};

export const LoadUserAPI = async (token) => {
  try {
    return await axios.get(url + "/load/shop", {
      headers: {
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    // ErrorMsg(error);
  }
};

export const ForgotAPI = async (email) => {
  try {
    return await axios.post(url + "/forgot/shop", { email });
  } catch (error) {
    ErrorMsg(error);
  }
};

export const ResetPasswordAPI = async (email, password, otp) => {
  try {
    return await axios.get(url + "/reset/shop", {
      params: {
        email,
        otp,
        password,
      },
    });
  } catch (error) {
    ErrorMsg(error);
  }
};

export const UserUpdateAPI = async (
  id,
  name,
  address,
  phone,
  shopName,
  shopAddress,
  shopZip,
  origins,
  token
) => {
  try {
    return await axios.post(
      url + "/update/shop",
      {
        id,
        name,
        address,
        phone,
        shopName,
        shopAddress,
        shopZip,
        origins,
      },
      {
        headers: {
          token: token,
        },
      }
    );
  } catch (error) {
    ErrorMsg(error);
  }
};

export const savedPushTokenAPI = async (id, expoToken, name,token) => {
  try {
    return await axios.get(url + "/saved/shop/token", {
      params: {
        id,
        name,
        token:expoToken,
      },
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};
