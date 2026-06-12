export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=604800`;
};

export const getToken = () => {
  const cookies = document.cookie.split("; ");

  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  return tokenCookie?.split("=")[1] || null;
};

export const clearToken = () => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
