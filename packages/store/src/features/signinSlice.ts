import { SigninState } from "@oms/types/store.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SigninState = {
  isLoading: false,
  error: null,
  success: false,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signinStart(state) {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    signinSuccess(state) {
      state.isLoading = false;
      state.success = true;
    },
    signinFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetSigninState() {
      return initialState;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, resetSigninState } = signinSlice.actions;
export default signinSlice.reducer;
