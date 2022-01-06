import axiosClient from './axiosClientNew';

const baseUrl = 'discount/';
const discountApi = {
  getDiscountByCode: (params) => {
    const url = baseUrl + 'code';
    return axiosClient.post(url, params);
  },
  useDiscount: (params) => {
    const url = baseUrl + 'use';
    return axiosClient.post(url, params);
  },
};

export default discountApi;
