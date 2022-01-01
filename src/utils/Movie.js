import { MovieModelMapPattern } from 'interfaces/MovideDetail';
import { MapVariable } from './MapVariables';

export const DetailGenresToIds = () => {};

export const MergeMovieLists = (theDbList, newList) => {
  const ChangedNameList = newList.map((item) =>
    MapVariable(item, MovieModelMapPattern)
  );
  console.log(ChangedNameList);
  return [...ChangedNameList, ...theDbList];
};
