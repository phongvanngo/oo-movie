import { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClientNew';

const userCommentApi = {
  getCommentByMovieID: (params: Record<string, any>) => {
    const url = 'comments';
    return axiosClient.get(url, params);
  },

  createComment: (data: Record<string, any>) => {
    const url = 'comment';
    return axiosClient.post(url, data);
  },
};

export default userCommentApi;
