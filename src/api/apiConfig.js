const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '54aa709695ac2db22242917da035c1fa',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
