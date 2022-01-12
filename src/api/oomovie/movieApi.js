import axiosClient from './axiosClientNew';

const movieApi = {
  getAll: (params) => {
    const url = 'movies';
    return axiosClient.get(url, params);
  },

  getMovieDetail: (params) => {
    // const url = 'movies/' + id;
    const url = 'movie';
    return axiosClient.get(url, params);
  },

  getListEpisodes: (params) => {
    const url = 'episodes';
    return axiosClient.get(url, params);
  },

  getDownloadLink: (params) => {
    const url = 'download';
    return axiosClient.get(url, params);
  },

  getListGenres: (params) => {
    const url = 'genres';
    return axiosClient.get(url, params);
  },

  rateMovie: (data, params) => {
    const url = 'movie/rating';
    return axiosClient.post(url, data, params);
  },
};

export default movieApi;
