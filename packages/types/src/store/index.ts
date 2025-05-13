export interface SignupState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface SigninState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface AuthUser {
  firstName: string;
}
