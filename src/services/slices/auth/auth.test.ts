import { expect } from "@jest/globals";
import fetchMock from "fetch-mock";
import { AnyAction } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { ThunkActionType } from "../../..";
import { BASE_URL } from "../../../utils/api-constants";

import userReducer, {
  initialState,
  login,
  loginFailed,
  loginPending,
  loginSuccess,
  logout,
  logoutFailed,
  logoutPending,
  logoutSuccess,
  refreshToken,
  refreshTokenFailed,
  refreshTokenPending,
  refreshTokenSuccess,
  register,
  registerFailed,
  registerPending,
  registerSuccess,
  resetFailed,
  resetPassword,
  resetPending,
  resetSuccess,
  restoreFailed,
  restorePassword,
  restorePending,
  restoreSuccess,
} from "./auth";
import { AuthState } from "./auth";

const middlewares = [thunk];
const mockStore = configureMockStore<AuthState, ThunkActionType>(middlewares);

describe("Auth reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Check initial state", () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("Register success", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/register`, {
      status: 200,
      user: {
        name: "user",
        email: "123456@mail.ru",
      },
      success: true,
    });

    const expectedActions = [
      registerPending(),
      registerSuccess(),
      loginPending(),
      loginFailed(),
    ];
    const store = mockStore(initialState);

    return store
      .dispatch(
        register({
          name: "user",
          password: 123456,
          email: "123456@mail.ru",
          newRoute: () => {
            return undefined;
          },
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, registerSuccess())).toEqual({
          ...initialState,
          registerState: "success",
        });
      });
  });

  it("Register failed", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/register`, {
      status: 400,
      success: false,
    });

    const expectedActions = [registerPending(), registerFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        register({
          name: "user",
          password: 123456,
          email: "123456@mail.ru",
          newRoute: () => {
            return undefined;
          },
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, registerFailed())).toEqual({
          ...initialState,
          registerState: "failed",
        });
      });
  });

  it("Restore password success", () => {
    fetchMock.postOnce(`${BASE_URL}/password-reset`, {
      status: 200,
      message: "Reset email sent",
      success: true,
    });

    const expectedActions = [restorePending(), restoreSuccess()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        restorePassword({
          email: "654321@mail.ru",
          newRoute: () => {
            return undefined;
          },
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, restoreSuccess())).toEqual({
          ...initialState,
          restoreState: "success",
        });
      });
  });

  it("Restore password failed", () => {
    fetchMock.postOnce(`${BASE_URL}/password-reset`, {
      status: 400,
      success: false,
    });

    const expectedActions = [restorePending(), restoreFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        restorePassword({
          email: "654321@mail.ru",
          newRoute: () => {
            return undefined;
          },
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, restoreFailed())).toEqual({
          ...initialState,
          restoreState: "failed",
        });
      });
  });

  it("Reset password success", () => {
    fetchMock.postOnce(`${BASE_URL}/reset`, {
      status: 200,
      message: "Password successfully reset",
      success: true,
    });

    const expectedActions = [resetPending(), resetSuccess()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        resetPassword({
          password: 123456,
          token: "token",
          newRoute: () => {
            return undefined;
          },
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, resetSuccess())).toEqual({
          ...initialState,
          resetState: "success",
        });
      });
  });

  it("Reset password failed", () => {
    fetchMock.postOnce(`${BASE_URL}/reset`, {
      status: 400,
      success: false,
    });

    const expectedActions = [resetPending(), resetFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        resetPassword({
          password: 123456,
          token: "token",
          newRoute: () => {
            return undefined;
          },
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, resetFailed())).toEqual({
          ...initialState,
          resetState: "failed",
        });
      });
  });

  it("Login success", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/login`, {
      status: 200,
      user: {
        email: "123456@mail.ru",
        password: 123456,
      },
      accessToken: "Bearer 123",
      success: true,
    });

    const expectedActions = [loginPending(), loginSuccess()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        login({
          email: "123456@mail.ru",
          password: 123456,
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, loginSuccess())).toEqual({
          ...initialState,
          loginState: "success",
        });
      });
  });

  it("Login failed", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/login`, {
      status: 400,
      success: false,
    });

    const expectedActions = [loginPending(), loginFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        login({
          email: "123456@mail.ru",
          password: 123456,
          resetForm: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, loginFailed())).toEqual({
          ...initialState,
          loginState: "failed",
        });
      });
  });

  it("Logout success", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/logout`, {
      status: 200,
      user: {
        email: "123456@mail.ru",
        password: 123456,
      },
      success: true,
    });

    const expectedActions = [logoutPending(), logoutSuccess()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        logout({
          newRoute: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, logoutSuccess())).toEqual({
          ...initialState,
          logoutState: "success",
        });
      });
  });

  it("Logout failed", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/logout`, {
      status: 400,
      success: false,
    });

    const expectedActions = [logoutPending(), logoutFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        logout({
          newRoute: () => {
            return undefined;
          },
        }) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, logoutFailed())).toEqual({
          ...initialState,
          logoutState: "failed",
        });
      });
  });

  it("Refresh token success", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/token`, {
      status: 200,
      accessToken: "Bearer 123",
      success: true,
    });

    const expectedActions = [
      refreshTokenPending(),
      refreshTokenSuccess(),
      logoutPending(),
      logoutFailed(),
    ];
    const store = mockStore(initialState);

    return store
      .dispatch(
        refreshToken(
          logout({
            newRoute: () => {
              return undefined;
            },
          })
        ) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, refreshTokenSuccess())).toEqual({
          ...initialState,
          refreshTokenState: "success",
        });
      });
  });

  it("Refresh token failed", () => {
    fetchMock.postOnce(`${BASE_URL}/auth/token`, {
      status: 400,
      success: false,
    });

    const expectedActions = [refreshTokenPending(), refreshTokenFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        refreshToken(
          logout({
            newRoute: () => {
              return undefined;
            },
          })
        ) as unknown as AnyAction
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, refreshTokenFailed())).toEqual({
          ...initialState,
          refreshTokenState: "failed",
        });
      });
  });
});
