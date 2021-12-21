import PageHeader from 'components/page-header/PageHeader';
import React, { ReactElement, useEffect, useState } from 'react';
import { ReactCreditCardProps } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import PaymentCard from './PaymentCard';
import './checkout.scss';
import Button from 'components/button/Button';
import Modal, { ModalContent, ModalWithButton } from 'components/modal/Modal';
import { RouteComponentProps, useHistory, useLocation } from 'react-router';
import { FixMeLater } from 'interfaces/Migrate';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectorUserHistory,
  updateUserHistory,
} from 'redux/reducer/userHistory';

interface Props {
  //   location: RouteComponentProps;
}

interface IPromotion {
  code: string;
  discount: number;
}

export default function Checkout({}: Props): ReactElement {
  // State luu tru giu lieu khi route khach push vao component nay
  const [itemPurchasing, setItemPurchasing] = useState<FixMeLater>(null);
  const history = useHistory();
  const [cardProps, setCardProps] = useState<ReactCreditCardProps>({
    cvc: '',
    expiry: '',
    focused: undefined,
    name: '',
    number: '',
    issuer: '',
  });
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [promotionState, setPromotionState] = useState<IPromotion>({
    code: '',
    discount: 10,
  });
  const [promotionInput, setPromotionInput] = useState('');

  const userHistory = useAppSelector(selectorUserHistory);
  const dispatch = useAppDispatch();

  //   ======== Component did mout ==============
  useEffect(() => {
    let itemFromStorage = JSON.parse(
      localStorage.getItem('selectedItem') as FixMeLater
    );

    console.log(itemFromStorage);
    setItemPurchasing(itemFromStorage);
    setTotal(itemFromStorage.item.price);
    setSubTotal(itemFromStorage.item.price);
  }, []);
  // +========== End use effect here ==========

  const setModalVisible = () => {
    const modal = document.querySelector(`#PaymentNotification`);
    if (modal) {
      modal.classList.toggle('active');
    }
  };

  const onCheckout = () => {
    setModalVisible();
    SaveCheckoutData();
  };

  // =========Thay doi local storage khi checkout.
  const SaveCheckoutData = () => {
    const newUserHistory = { ...userHistory };

    //======= Save bill ne===
    const bill = CreateBill();
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

  const CreateBill = () => {
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

  const pushToMovie = () => {
    // Neu don hang la phim => chuyen den trang phim
    if (!itemPurchasing.isPlan) {
      history.push(`/${itemPurchasing.MovieOrTv}/${itemPurchasing.item.id}`);
    } else {
      history.push('/');
    }
  };

  const pushToHome = () => {
    history.push('/');
  };

  const AddPromotion = () => {
    setPromotionState({
      ...promotionState,
      code: promotionInput,
    });

    const total =
      itemPurchasing.item.price -
      itemPurchasing.item.price * (promotionState.discount / 100.0);
    setTotal(total);
  };

  return (
    <>
      <PageHeader></PageHeader>
      <div className="flex payment__wrapper">
        <div className="w-3/5 flex flex-col payment__information">
          <div className="font-semibold mb-8">Payment Information</div>
          <PaymentCard cardProps={cardProps} setCardProps={setCardProps} />
        </div>
        <div className="w-2/5 payment__items ">
          <div className="font-semibold mb-8">Order Summary</div>

          <div className="pb-4" id="purchasing-item">
            <div className="flex justify-between mb-4 ">
              {itemPurchasing?.item.last_episode_to_air && (
                <div>{itemPurchasing?.item.name}</div>
              )}
              {!itemPurchasing?.item.last_episode_to_air && (
                <div>{itemPurchasing?.item.title}</div>
              )}
              <div>${itemPurchasing?.item.price}</div>
            </div>
            {promotionState.code && (
              <div className="flex justify-between mb-4 ">
                <div>{promotionState.code}</div>
                <div>{promotionState.discount}%</div>
              </div>
            )}
          </div>

          <hr className="mb-4" />

          <div className="flex flex-col justify-between mb-4">
            <div className="payment__input__wrapper-label">Promotion</div>
            <div className="flex justify-between">
              <input
                className="promotion__input__content w-3/5"
                type="tel"
                name="code"
                placeholder="Promotion code"
                value={promotionInput}
                onChange={(e: any) => setPromotionInput(e.target.value)}
              />
              <div
                onClick={AddPromotion}
                className="promotion__button promotion__button-small"
              >
                Use code
              </div>
            </div>
          </div>

          <hr className="mb-4" />

          {/* Total */}
          <div className="mb-6">
            <div className="flex justify-between mb-1.5">
              <div>Sub-Total</div>
              <div>${subTotal}</div>
            </div>

            <div className="flex justify-between font-semibold text-xl">
              <div>Total</div>
              <div>${total}</div>
            </div>
          </div>

          <div
            onClick={onCheckout}
            className="promotion__button promotion__button-big"
          >
            Check out
          </div>
        </div>
      </div>
      {/* @ts-ignore */}
      <Modal active={false} id="PaymentNotification">
        {/* @ts-ignore */}
        <ModalWithButton
          onOk={pushToMovie}
          okContent="Watch now"
          abortContent="Later"
          onAbort={pushToHome}
        >
          <div className="flex justify-center items-center text-xl text-center">
            <div>Purchase successfully! Get your pop corn now!</div>
          </div>
        </ModalWithButton>
      </Modal>
    </>
  );
}
