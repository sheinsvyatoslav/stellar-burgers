import { createSlice } from "@reduxjs/toolkit";
import {
  registerRequest,
  restorePasswordRequest,
  resetPasswordRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
} from "../../utils/auth-api";
import { setCookie, clearCookie } from "../../utils/cookie";
import { TThunkAction } from "../../utils/constants";

type TNewRoute = { newRoute: () => void };
type TResetForm = { resetForm: () => void };
type TAuthData = { email: string; password: number };
type TRegister = { name: string } & TAuthData & TNewRoute & TResetForm;
type TLogin = TAuthData & TResetForm;

type TResetPassword = {
  password: number;
  token: string;
} & TNewRoute &
  TResetForm;

type TRestorePassword = {
  email: string;
} & TNewRoute &
  TResetForm;

type TAuthState = {
  registerState: string;
  restoreState: string;
  resetState: string;
  loginState: string;
  logoutState: string;
  refreshTokenState: string;
};

const initialState: TAuthState = {
  registerState: "idle",
  restoreState: "idle",
  resetState: "idle",
  loginState: "idle",
  logoutState: "idle",
  refreshTokenState: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerPending(state) {
      state.registerState = "pending";
    },
    registerSuccess(state) {
      state.registerState = "success";
    },
    registerFailed(state) {
      state.registerState = "failed";
    },
    restorePending(state) {
      state.restoreState = "pending";
    },
    restoreSuccess(state) {
      state.restoreState = "success";
    },
    restoreFailed(state) {
      state.restoreState = "failed";
    },
    resetPending(state) {
      state.resetState = "pending";
    },
    resetSuccess(state) {
      state.resetState = "success";
    },
    resetFailed(state) {
      state.resetState = "failed";
    },
    loginPending(state) {
      state.loginState = "pending";
    },
    loginSuccess(state) {
      state.loginState = "success";
    },
    loginFailed(state) {
      state.loginState = "failed";
    },
    logoutPending(state) {
      state.logoutState = "pending";
    },
    logoutSuccess(state) {
      state.logoutState = "success";
    },
    logoutFailed(state) {
      state.logoutState = "failed";
    },
    refreshTokenPending(state) {
      state.refreshTokenState = "pending";
    },
    refreshTokenSuccess(state) {
      state.refreshTokenState = "success";
    },
    refreshTokenFailed(state) {
      state.refreshTokenState = "failed";
    },
  },
});

const {
  registerPending,
  registerSuccess,
  registerFailed,
  restorePending,
  restoreSuccess,
  restoreFailed,
  resetPending,
  resetSuccess,
  resetFailed,
  loginPending,
  loginSuccess,
  loginFailed,
  logoutPending,
  logoutSuccess,
  logoutFailed,
  refreshTokenPending,
  refreshTokenSuccess,
  refreshTokenFailed,
} = authSlice.actions;

export const register = ({
  email,
  password,
  name,
  resetForm,
  newRoute,
}: TRegister): TThunkAction => {
  return (dispatch) => {
    dispatch(registerPending());
    registerRequest({ email, password, name })
      .then(() => {
        dispatch(registerSuccess());
        dispatch(login({ email, password, resetForm }));
        newRoute();
      })
      .catch((err) => {
        console.log(err);
        dispatch(registerFailed());
      });
  };
};

export const restorePassword = ({
  email,
  newRoute,
  resetForm,
}: TRestorePassword): TThunkAction => {
  return (dispatch) => {
    dispatch(restorePending());
    restorePasswordRequest(email)
      .then((res) => {
        dispatch(restoreSuccess());
        setCookie("message", res.message);
        resetForm();
        newRoute();
      })
      .catch((err) => {
        console.log(err);
        dispatch(restoreFailed());
      });
  };
};

export const resetPassword = ({
  password,
  token,
  resetForm,
  newRoute,
}: TResetPassword): TThunkAction => {
  return (dispatch) => {
    dispatch(resetPending());
    resetPasswordRequest({ password, token })
      .then(() => {
        dispatch(resetSuccess());
        clearCookie("message");
        resetForm();
        newRoute();
      })
      .catch((err) => {
        console.log(err);
        dispatch(resetFailed());
      });
  };
};

export const login = ({ email, password, resetForm }: TLogin): TThunkAction => {
  return (dispatch) => {
    dispatch(loginPending());
    loginRequest({ email, password })
      .then((res) => {
        let authToken = res.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("accessToken", authToken);
          setCookie("password", password);
          setCookie("refreshToken", res.refreshToken);
          dispatch(loginSuccess());
          resetForm();
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailed());
      });
  };
};

export const logout = ({ newRoute }: TNewRoute): TThunkAction => {
  return (dispatch) => {
    dispatch(logoutPending());
    logoutRequest()
      .then(() => {
        clearCookie("accessToken");
        clearCookie("refreshToken");
        clearCookie("password");
        newRoute();
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(logoutFailed());
      });
  };
};

export const refreshToken = (afterRefresh: TThunkAction): TThunkAction => {
  return (dispatch) => {
    dispatch(refreshTokenPending());
    refreshTokenRequest()
      .then((res) => {
        let authToken = res.accessToken.split("Bearer ")[1];
        setCookie("accessToken", authToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch(refreshTokenSuccess());
        dispatch(afterRefresh);
      })
      .catch((err) => {
        console.log(err);
        dispatch(refreshTokenFailed());
      });
  };
};

export default authSlice.reducer;
