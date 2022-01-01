// Them attribute is selected de xac dinh cac category dc selected
export const addAttributeCategory = (
  listCategories,
  handleChangeCategories
) => {
  let newCategories = [];
  if (listCategories) {
    newCategories = listCategories.map((cate) => {
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
  selectedCate,
  currentCategories,
  handleChangeCategories
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
};

// List category nay de xu ly logics
export const updateListSelectedCategories = (
  selectedCategory,
  currentCategories,
  handleChangeCategories
) => {
  let newActiveCategories = currentCategories.filter(
    (cate) => cate.is_selected === true
  );
  currentCategories.forEach((cate) => {
    if (cate.name === selectedCategory) {
      if (cate.is_selected === false) {
        newActiveCategories.push(cate);
      } else {
        newActiveCategories = newActiveCategories.filter(
          (cate) => cate.name !== selectedCategory
        );
      }
    }
  });
  handleChangeCategories(newActiveCategories);
};

//   Trigger khi click All
export const clearSelectedCategories = (
  currentCategories,
  setCategories,
  setActiveCategories
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
