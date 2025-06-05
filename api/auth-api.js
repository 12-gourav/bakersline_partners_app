import axios from "axios";
import Toast from "react-native-toast-message";

const url = "https://bakersline-backend.onrender.com/api/v1";

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
    console.log(myform)
    return await axios.post(url + "/register/agent", myform, {
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
    return await axios.get(url + "/verify/agent", {
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
    return await axios.post(url + "/login/agent", {
      email,
      password,
    });
  } catch (error) {
    ErrorMsg(error);
  }
};

export const LoadUserAPI = async (token) => {
  try {
    return await axios.get(url + "/load/agent", {
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
    return await axios.post(url + "/forgot/agent", { email });
  } catch (error) {
    ErrorMsg(error);
  }
};

export const ResetPasswordAPI = async (email, password, otp) => {
  try {
    return await axios.get(url + "/reset/agent", {
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

export const UserUpdateAPI = async (id, name, address, phone, token) => {
  try {
    return await axios.post(
      url + "/update/agent",
      {
        id,
        name,
        address,
        phone,
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
