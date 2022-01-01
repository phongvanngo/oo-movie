import { updateUserHistory } from 'redux/reducer/userHistory';

export const CreateBill = (itemPurchasing, promotionState, total) => {
  const date = new Date(Date.now());
  const today = date.toDateString();
  const billCode = Math.floor(Math.random() * 999) + 100;
  let bill = {
    id: billCode,
    date: today,
    item: itemPurchasing.item,
    promotion: promotionState,
    total: total,
  };
  return bill;
};

// =========Thay doi local storage khi checkout.
export const SaveCheckoutData = (
  userHistory,
  itemPurchasing,
  promotionState,
  total,
  dispatch
) => {
  const newUserHistory = { ...userHistory };

  //======= Save bill ne===
  const bill = CreateBill(itemPurchasing, promotionState, total);
  let newListBills = [...newUserHistory.bills];
  newListBills.unshift(bill);
  newUserHistory.bills = newListBills;

  // Mua plan thi coi dc het phim
  if (itemPurchasing.isPlan) {
    newUserHistory.isBoughtPlan = true;
  } else {
    // Mua phim thi them phim vao
    let newListBoughtMovies = [...newUserHistory.boughtMovies];
    newListBoughtMovies.unshift(itemPurchasing.item);
    newUserHistory.boughtMovies = newListBoughtMovies;
  }

  dispatch(updateUserHistory(newUserHistory));
};
