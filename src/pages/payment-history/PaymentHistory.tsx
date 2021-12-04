import React, { ReactElement } from 'react';
import ProfileLayout from 'layout/profile/ProfileLayout';
import { FixMeLater } from 'interfaces/Migrate';

interface Props {}

const HistoryCard = (props: FixMeLater): ReactElement => {
  return (
    <div className="p-4  bg-white rounded-2xl text-black mb-5">
      <div className="flex items-center mb-1.5">
        <div className="mr-3">#123</div>
        <div className="mr-3">Payment for NK</div>
        <div className="opacity-80 text-sm"> 21 - 2 -2021</div>
      </div>
      <div className="flex w-1/2">
        <div className="mr-4">Avernger</div>
        <div>$100</div>
      </div>
    </div>
  );
};

export default function PaymentHistory({}: Props): ReactElement {
  return (
    <div>
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  );
}
