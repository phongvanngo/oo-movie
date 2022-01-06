import React, { ReactElement } from 'react';
import ProfileLayout from 'layout/profile/ProfileLayout';
import { FixMeLater } from 'interfaces/Migrate';
import { useAppSelector } from 'redux/hooks';
import { selectorUserHistory } from 'redux/reducer/userHistory';

interface Props {}

const HistoryCard = (props: FixMeLater): ReactElement => {
  return (
    <div className="p-4  bg-white rounded-2xl text-black mb-5">
      <div className="flex items-center mb-1.5">
        <div className="mr-3">#{props.infor.id}</div>
        <div className="mr-3">Payment Completed</div>
        <div className="opacity-80 text-sm mr-3">{props.infor.date}</div>
      </div>
      <div className="flex w-1/2">
        <div className="mr-4">
          {props.infor.item?.name || props.infor.item?.title}
        </div>
        <div>${props.infor.item.price}</div>
      </div>
      {props.infor?.promotion.code && (
        <div className="flex w-1/2">
          <div className="mr-4">Discount:</div>

          <div className="mr-4">{props.infor?.promotion.value}</div>

          <div>{props.infor?.promotion.discount}%</div>
        </div>
      )}
      <div className="flex w-1/2">
        <div className="mr-4 font-semibold">Total:</div>
        <div>${props.infor.total}</div>
      </div>
    </div>
  );
};

export default function PaymentHistory({}: Props): ReactElement {
  const currentUser = useAppSelector(selectorUserHistory);
  return (
    <div>
      {currentUser.bills &&
        currentUser.bills.map((bill: FixMeLater, index: number) => (
          <HistoryCard key={index} infor={bill} />
        ))}
    </div>
  );
}
