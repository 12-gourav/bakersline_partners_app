import axios from "axios";
import Toast from "react-native-toast-message";

// const url = "https://bakersline-backend.onrender.com/api/v1";
const url = "https://www.api.bakersline.in/api/v1";

const ErrorMsg = (e) => {
  console.log(e);
  Toast.show({
    type: "error",
    text1: "Oops!",
    text2: e?.response?.data?.msg,
  });
};

export const GetOrigins = async () => {
  try {
    return await axios.post(url + "/full/origins");
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const GetUpcomingOrders = async (token) => {
  try {
    return await axios.get(url + "/upcoming/orders/by/supplier", {
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const GetOrdersDetails = async (id) => {
  try {
    return await axios.get(url + "/order/detail", {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    ErrorMsg(error);
  }
};

export const DispatchOrderAPI = async (id, otp, token) => {
  try {
    return await axios.get(url + "/update/order/otp/by/supplier", {
      params: {
        orderId: id,
        otp: Number(otp),
      },
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error?.response);
    ErrorMsg(error);
  }
};

export const GetAllOrders = async (current, date,status, limit, query, token) => {
  try {
    return await axios.get(url + "/get/supplier/orders", {
      params: {
        page: current,
        date: date,
        limit,
        query,
        status
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



export const getAnalyticsAPI = async (token) => {
  try {
    return await axios.get(url + "/supplier/analytics", {
    
      headers: {
        token,
      },
    });
  } catch (error) {
    console.log(error?.response);
    ErrorMsg(error);
  }
};




export const GetPayments = async (current,date,query,status,token) => {
  try {
    return await axios.get(url + "/supplier/payments", {
      params:{
        page:current,
        date,
        query,
        limit:10,
        status
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
