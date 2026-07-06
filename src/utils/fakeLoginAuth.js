const AUTH_KEY = "fake-login-authenticated";
const VALID_USERNAME = "imauser";
const VALID_PASSWORD = "miaadmin";

export function isFakeLoginAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setFakeLoginAuthenticated() {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function clearFakeLogin() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function validateFakeLoginCredentials(username, password) {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}
