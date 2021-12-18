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

interface IListPurchasing {
  name: string;
  price: number;
}

export default function Checkout({}: Props): ReactElement {
  // State luu tru giu lieu khi route khach push vao component nay
  const { state } = useLocation<FixMeLater>();

  const [listPurchasing, setListPurchasing] = useState<any>([]);
  const history = useHistory();
  const [cardProps, setCardProps] = useState<ReactCreditCardProps>({
    cvc: '',
    expiry: '',
    focused: undefined,
    name: '',
    number: '',
    issuer: '',
  });

  const userHistory = useAppSelector(selectorUserHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let selectedItem = [
      {
        id: 0,
        name: state.title,
        price: state.price,
      },
    ];
    setListPurchasing(selectedItem);
  }, []);

  const [promotionState, setPromotionState] = useState<string>('');

  const setModalVisible = () => {
    const modal = document.querySelector(`#PaymentNotification`);
    if (modal) {
      modal.classList.toggle('active');
    }
    HandleLocalStorage();
  };

  const HandleLocalStorage = () => {
    const newUserHistory = { ...userHistory };
    newUserHistory.isBoughtPlan = true;
    dispatch(updateUserHistory(newUserHistory));
  };

  const pushToMovie = () => {
    //Test route
    history.push('/movie/568124');
  };

  const pushToHome = () => {
    history.push('/');
  };

  const onPromotionChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setPromotionState(e.currentTarget.value);
  };

  const AddPromotion = () => {
    const promotion: IListPurchasing = {
      name: promotionState,
      price: -30,
    };
    const newPurchaseList = [...listPurchasing];
    newPurchaseList.push(promotion);
    setListPurchasing(newPurchaseList);
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
            {listPurchasing.length > 0 &&
              listPurchasing.map((item: FixMeLater, index: FixMeLater) => (
                <div key={index} className="flex justify-between mb-4 ">
                  <div>{item.name}</div>
                  <div>${item.price}</div>
                </div>
              ))}
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
                value={promotionState}
                onChange={onPromotionChange}
              />
              <div
                onClick={() => {
                  AddPromotion();
                }}
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
              <div>$90</div>
            </div>

            <div className="flex justify-between font-semibold text-xl">
              <div>Total</div>
              <div>$60</div>
            </div>
          </div>

          <div
            onClick={setModalVisible}
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
