import { MovieModelMapPattern } from 'interfaces/MovideDetail';
import { MapVariable } from './MapVariables';
import { category } from 'api/tmdbApi';

export const mergeMovieLists = (theDbList, newList) => {
  const ChangedNameList = newList.map((item) =>
    MapVariable(item, MovieModelMapPattern)
  );
  return [...ChangedNameList, ...theDbList];
};

export const mapMoviesByType = (originalList, type) => {
  let newList = [];
  if (type === category.movie) {
    newList = originalList.filter((movie) => !movie.is_tv_series);
  } else {
    newList = originalList.filter((movie) => movie.is_tv_series);
  }
  return newList;
};

export const searchMovies = (originalList, keyword) => {
  return originalList.filter((movie) => {
    const title = movie.title.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    return title.indexOf(lowerKeyword) >= 0;
  });
};

export const filterMoviesByTrue = (listMovies) => {
  if (listMovies) {
    return listMovies.filter((movie) => movie.enabled === true);
  } else {
    return [];
  }
};
