import baseApi from ".";

const companyApi = {
  list: (Data: any) => baseApi.post(`/company/list`, Data),
  getInfo: (Data: any) => baseApi.post(`/company/info`, Data),
  getAvg: (Data: any) => baseApi.post(`/average/info`, Data),
  getCustomList: (Data: any) => baseApi.post(`/company/customlist`, Data),
  getSearchList: (Data: any) => baseApi.post(`/company/searchList`, Data),
  getCompanyAnalysis: (Data: any) =>
    baseApi.post(`/company/companyAnalysis`, Data),
  getCompanyList: (Data: any) => baseApi.post(`/company/getListCompany`, Data),
};

export default { companyApi };
