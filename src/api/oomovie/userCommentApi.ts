import { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClientNew';

const userCommentApi = {
  getCommentByMovieID: (params: Record<string, any>) => {
    const url = 'comment';
    return axiosClient.get(url, params);
  },
};

export default userCommentApi;
