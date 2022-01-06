import axiosClient from './axiosClientNew';

const baseUrl = 'discount/';
const discountApi = {
  getDiscountByCode: (params) => {
    const url = baseUrl + 'code';
    return axiosClient.get(url, params);
  },
  useDiscount: (params) => {
    const url = baseUrl + 'use';
    return axiosClient.post(url, undefined, params);
  },
};

export default discountApi;
