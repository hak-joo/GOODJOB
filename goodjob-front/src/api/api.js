import { API_SERVER } from "../config/config";
import { loginedApi, notLoginedApi } from "./api-base";

export const userApi = {
    login: (Data) => notLoginedApi.post(`/user/register`, Data),
};
