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

  getPurchasedMovies: (data: Record<string, any>) => {
    const url = 'purchased/movies';
    return axiosClient.get(url, data);
  },

  getPurcasedPlan: (data: Record<string, any>) => {
    const url = 'purchased/plan';
    return axiosClient.get(url, data);
  },
};

export default checkoutApi;
