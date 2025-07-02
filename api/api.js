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

export const GetOrigins = async () => {
  try {
    return await axios.get(url + "/full/origins", {

    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};