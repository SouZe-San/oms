import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupState } from "@oms/types/store.type"

const initialState: SignupState = {
  isLoading: false,
  error: null,
  success: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupStart(state) {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    signupSuccess(state) {
      state.isLoading = false;
      state.success = true;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetSignupState() {
      return initialState;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;
