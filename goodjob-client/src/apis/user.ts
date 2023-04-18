import { baseApi } from "./index";

export const userApi = {
  login: (Data: any) => baseApi.post(`/user/login`, Data),
  getUser: (Data: any) => baseApi.post(`/user/getuser`, Data),
  setting: (Data: any) => baseApi.post(`/user/setting`, Data),
  register: (Data: any) => {
    const res = baseApi.post("/user/register", Data);
    return res;
  },
};

export default { userApi };
