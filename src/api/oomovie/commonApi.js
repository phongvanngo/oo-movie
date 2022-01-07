import axiosClient from './axiosClientNew';

const commonApi = {
  register: (data) => {
    const url = 'register';
    return axiosClient.post(url, data);
  },

  login: (data) => {
    const url = 'login';
    return axiosClient.post(url, data);
  },

  getUser: () => {
    const url = 'user';
    return axiosClient.get(url);
  },
};

export default commonApi;
