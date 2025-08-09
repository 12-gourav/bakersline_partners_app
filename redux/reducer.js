import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { isValid: false, user: null },
  (builder) => {
    builder
      .addCase("login", (state, action) => {
        state.isValid = true;
        state.user = action.payload;
      })
      .addCase("load", (state, action) => {
        state.isValid = true;
        state.user = action.payload;
      })
      .addCase("logout", (state, action) => {
        state.isValid = false;
        state.user = null;
      });
  }
);


export const paymentReducer = createReducer({ payment: {} }, (builder) => {
  builder.addCase("addPayment", (state, action) => {
    state.payment = action.payload;
  });
});
