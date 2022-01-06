import axiosClient from './axiosClientNew';

const planApi = {
  getAllPlan: (params) => {
    const url = 'plans';
    return axiosClient.get(url, params);
  },
};

export default planApi;
