import axiosClient from './axiosClientNew';

const planApi = {
  getAllPlans: (params) => {
    const url = 'plans';
    return axiosClient.get(url, params);
  },
};

export default planApi;
