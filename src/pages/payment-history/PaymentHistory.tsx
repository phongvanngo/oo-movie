import checkoutApi from 'api/oomovie/checkoutApi';
import Modal, { ModalWithButton } from 'components/modal/Modal';
import { FixMeLater } from 'interfaces/Migrate';
import { Order } from 'interfaces/Order';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUser } from 'redux/reducer/authenticateSlice';
import { setLoading } from 'redux/reducer/loader';
import { numberToDate } from 'utils/commonConvert';
import OrderDetail from './OrderDetail';

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
        <div className="mr-3 font-semibold">#{order?.id.substring(0, 6)}</div>
        <div className="mr-3">Payment Completed</div>
        <div className="opacity-80 text-sm mr-3">{orderTime}</div>
      </div>

      {order?.plan && (
        <div className="flex w-1/2">
          <div className="mr-4 font-semibold">Item:</div>
          <div className="mr-4">{order?.plan?.name}</div>
          <div>${order?.plan.price}</div>
        </div>
      )}

      {order?.movies.length > 0 && (
        <div className="flex w-1/2">
          <div className="mr-4 font-semibold">Item:</div>
          <div className="mr-4">{order?.movies[0]?.name}</div>
          <div>${order?.movies[0]?.price}</div>
        </div>
      )}

      {order?.discount?.name && (
        <div className="flex w-1/2">
          <div className="mr-4 font-semibold">Discount:</div>
          <div className="mr-4">{order?.discount?.name}</div>
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

  const userAuth = useAppSelector(selectorUser);

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
            params: { user_id: user?.id },
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

  if (listOrders.length < 1) {
    return <div>You haven't made any payment yet</div>;
  }

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
          <OrderDetail order={currentOrderDetail} user={userAuth} />
        </ModalWithButton>
      </Modal>
    </div>
  );
}
