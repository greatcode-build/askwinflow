const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "";
export const API_URL = rawApiUrl.replace(/\/+$/, "");

export const buildApiUrl = (endpoint: string) => {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};
