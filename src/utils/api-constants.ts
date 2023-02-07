const BASE_API_URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;
export const RESTORE_URL = `${BASE_API_URL}/password-reset`;
export const RESET_URL = `${RESTORE_URL}/reset`;

const BASE_AUTH_URL = `${BASE_API_URL}/auth`;
export const REGISTER_URL = `${BASE_AUTH_URL}/register`;
export const LOGIN_URL = `${BASE_AUTH_URL}/login`;
export const REFRESH_TOKEN_URL = `${BASE_AUTH_URL}/token`;
export const LOGOUT_URL = `${BASE_AUTH_URL}/logout`;
export const USER_URL = `${BASE_AUTH_URL}/user`;

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));
};

const checkSuccess = (res: { success: boolean } & any) => {
  if (res && res.success) {
    return res;
  }
  throw Error("no data");
};

export const request = async (url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse).then(checkSuccess);
};
