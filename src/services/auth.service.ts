import axiosInstance from ".";

interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

export const loginService = async (
  data: LoginPayload
) => {
  const resp = await axiosInstance.post("/auth/login", data);
  return resp.data;
};


export const logoutService = async () => {
  const resp = await axiosInstance.post("/auth/logout", []);
  return resp.data;
}
