import { setRefreshToken, setToken } from "./auth";

export const saveTokensFromUrlHash = () => {
  if (typeof window === "undefined") return false;

  const hash = window.location.hash;

  if (!hash) return false;

  const params = new URLSearchParams(hash.replace("#", ""));

  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (!accessToken) return false;

  setToken(accessToken);

  if (refreshToken) {
    setRefreshToken(refreshToken);
  }

  window.history.replaceState(null, "", window.location.pathname);

  return true;
};
