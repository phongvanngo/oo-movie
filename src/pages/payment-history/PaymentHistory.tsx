import React, { ReactElement, useEffect, useState } from 'react';
import ProfileLayout from 'layout/profile/ProfileLayout';
import { FixMeLater } from 'interfaces/Migrate';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUserHistory } from 'redux/reducer/userHistory';
import Modal, { ModalWithButton } from 'components/modal/Modal';
import { Order } from 'interfaces/Order';
import checkoutApi from 'api/oomovie/checkoutApi';
import { numberToDate } from 'utils/commonConvert';
import OrderDetail from './OrderDetail';
import { setLoading } from 'redux/reducer/loader';

interface Props {
  order: Order;
  displayDetail: FixMeLater;
}

const HistoryCard = ({ order, displayDetail }: Props): ReactElement => {
  const handleDetail = () => {
    if (displayDetail) {
      console.log('hien thi');

      displayDetail(order);
    }
  };

  const orderTime = numberToDate(order?.order_time);

  return (
    <div
      className="p-4  bg-white rounded-2xl text-black mb-5 cursor-pointer transform duration-500 hover:scale-105"
      onClick={handleDetail}
    >
      <div className="flex items-center mb-1.5">
        <div className="mr-3">#{order?.id.substring(0, 6)}</div>
        <div className="mr-3">Payment Completed</div>
        <div className="opacity-80 text-sm mr-3">{orderTime}</div>
      </div>
      <div className="flex w-1/2">
        {order?.plan && <div className="mr-4">{order?.plan?.name}</div>}
        {order?.movies && <div className="mr-4">{order?.movies[0]?.name}</div>}
        <div>${order?.total}</div>
      </div>
      {order?.discount?.name && (
        <div className="flex w-1/2">
          <div className="mr-4">Discount:</div>

          <div>{order?.discount?.value}%</div>
        </div>
      )}
      <div className="flex w-1/2">
        <div className="mr-4 font-semibold">Total:</div>
        <div>${order.total}</div>
      </div>
    </div>
  );
};

export default function PaymentHistory({}: Props): ReactElement {
  const [currentOrderDetail, setCurrentOrderDetail] = useState<Order | null>(
    null
  );

  const [listOrders, setListOrders] = useState<Order[] | []>([]);

  const userHistory = useAppSelector(selectorUserHistory);

  const dispatch = useAppDispatch();

  const displayOrderDetail = (order: Order) => {
    const modal = document.querySelector(`#orderdetail`);
    console.log(order);
    if (modal) {
      modal.classList.toggle('active');
    }
    setCurrentOrderDetail(order);
  };

  useEffect(() => {
    const getAllOrders = async () => {
      let user: FixMeLater = localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        try {
          const response = await checkoutApi.getOrders({
            params: { id: user?.id },
          });
          setListOrders(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    dispatch(setLoading(true));
    getAllOrders().finally(() => {
      dispatch(setLoading(false));
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {listOrders &&
        listOrders.map((bill: FixMeLater, index: number) => (
          <HistoryCard
            key={index}
            order={bill}
            displayDetail={displayOrderDetail}
          />
        ))}

      {/* @ts-ignore */}
      <Modal active={false} id="orderdetail">
        {/* @ts-ignore */}
        <ModalWithButton okContent="Ok" onOk={() => {}}>
          <OrderDetail order={currentOrderDetail} user={userHistory} />
        </ModalWithButton>
      </Modal>
    </div>
  );
}
