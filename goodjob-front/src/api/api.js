import { baseApi} from "./api-base";

export const userApi = {
    login: (Data) => baseApi.post(`/user/login`, Data),
    getUser: (Data) => baseApi.post(`/user/getuser`, Data),
    setting: (Data) => baseApi.post(`/user/setting`, Data),
};

export const companyApi = {
    list: (Data) => baseApi.post(`/company/list`, Data),
    getInfo: (Data) => baseApi.post(`/company/info`, Data),
    getAvg: (Data) => baseApi.post(`/average/info`, Data),
    getCustomList: (Data) => baseApi.post(`/company/customlist`, Data),
    getSearchList: (Data) => baseApi.post(`/company/searchList`, Data),
    getCompanyAnalysis: (Data) => baseApi.post(`/company/companyAnalysis`, Data),
    getCompanyList: (Data) => baseApi.post(`/company/getListCompany`, Data),
};
