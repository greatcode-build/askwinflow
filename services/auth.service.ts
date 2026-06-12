import { API_URL } from "@/app/lib/api";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.json();
};

export const register = async (payload: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(res);
  return res.json();
};

export const logout = async () => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
  });
};
