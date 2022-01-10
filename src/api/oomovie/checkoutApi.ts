import axiosClient from './axiosClientNew';

const checkoutApi = {
  getOrders: (params: Record<string, any>) => {
    const url = 'orders';
    return axiosClient.get(url, params);
  },

  createOrder: (data: Record<string, any>) => {
    const url = 'order';
    return axiosClient.post(url, data);
  },
};

export default checkoutApi;
