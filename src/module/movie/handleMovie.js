import { category } from 'api/tmdbApi';

export const MapMoviesByType = (originalList, type) => {
  let newList = [];
  if (type === category.movie) {
    newList = originalList.filter((movie) => !movie.isTVSeries);
  } else {
    newList = originalList.filter((movie) => movie.isTVSeries);
  }
  return newList;
};

export const SearchMovies = (originalList, keyword) => {
  return originalList.filter((movie) => {
    const title = movie.title.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    return title.indexOf(lowerKeyword) >= 0;
  });
};
