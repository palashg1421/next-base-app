import axiosInstance from ".";

export const loginService = async (data: any) => {
  const resp = await axiosInstance.post("/auth/login", data);
  return resp.data;
};


export const logoutService = async () => {
  const resp = await axiosInstance.post("/auth/logout", []);
  return resp.data;
}
