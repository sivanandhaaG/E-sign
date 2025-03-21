import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  accessToken: null,
  paymentType: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        firstName,
        middleName,
        lastName,
        email,
        accessToken,
        paymentType,
      } = action.payload;
      state.firstName = firstName;
      state.middleName = middleName;
      state.lastName = lastName;
      state.email = email;
      state.accessToken = accessToken;
      state.paymentType = paymentType;
    },
    clearUser: (state) => {
      state.firstName = "";
      state.middleName = "";
      state.lastName = "";
      state.email = "";
      state.accessToken = null;
      state.paymentType = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
