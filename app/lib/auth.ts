export const setToken = (token: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `token=${encodeURIComponent(
    token,
  )}; path=/; max-age=604800; SameSite=Lax`;
};

export const setRefreshToken = (refreshToken: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `refresh_token=${encodeURIComponent(
    refreshToken,
  )}; path=/; max-age=604800; SameSite=Lax`;
};

export const getToken = () => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

export const getRefreshToken = () => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("refresh_token="),
  );

  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

export const clearToken = () => {
  if (typeof document === "undefined") return;

  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const clearRefreshToken = () => {
  if (typeof document === "undefined") return;

  document.cookie =
    "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const clearAuthTokens = () => {
  clearToken();
  clearRefreshToken();
};
