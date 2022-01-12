import { FixMeLater } from 'interfaces/Migrate';
import { Category } from 'interfaces/Category';

// Them attribute is selected de xac dinh cac category dc selected
export const addAttributeCategory = (
  listCategories: Category[],
  handleChangeCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  let newCategories = [];
  if (listCategories) {
    newCategories = listCategories.map((cate: FixMeLater) => {
      return {
        ...cate,
        is_selected: false,
      };
    });
  }
  handleChangeCategories(newCategories);
};

// Danh sach nay dung de hien thi
export const updateDisplayCategories = (
  selectedCate: string,
  currentCategories: Category[],
  handleChangeCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  handleChangeActiveCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  let newCategories = [...currentCategories];
  newCategories = newCategories.map((cate) => {
    if (cate.name === selectedCate) {
      return {
        ...cate,
        is_selected: !cate.is_selected,
      };
    } else {
      return {
        ...cate,
      };
    }
  });

  handleChangeCategories(newCategories);

  let newActiveCategories = newCategories.filter(
    (cate) => cate.is_selected === true
  );
  handleChangeActiveCategories(newActiveCategories);
};

//   Trigger khi click All
export const clearSelectedCategories = (
  currentCategories: Category[],
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setActiveCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  let newCategories = [...currentCategories];
  newCategories = newCategories.map((cate) => {
    if (cate.is_selected === true) {
      return {
        ...cate,
        is_selected: !cate.is_selected,
      };
    } else {
      return {
        ...cate,
      };
    }
  });
  setActiveCategories([]);
  setCategories(newCategories);
};

export const filterGenresTrue = (listGenres: FixMeLater) => {
  if (listGenres) {
    return listGenres.filter((genre: FixMeLater) => genre.enabled === true);
  } else {
    return [];
  }
};
