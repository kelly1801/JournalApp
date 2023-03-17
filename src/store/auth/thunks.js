import { checkingCredentials } from "./authSlice";

export const checkingAuth = (email = "", password = "") => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
