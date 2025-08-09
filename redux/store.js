import { configureStore } from "@reduxjs/toolkit";
import { paymentReducer, userReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
  },
});
