import React, { MouseEventHandler } from 'react';
import './plan-card.scss';
import { AiFillLike } from 'react-icons/ai';
import Button from 'components/button/Button';

interface Props {
  //   name: string;
  //   price: number;
  //   content: string[];
  //   link: string;
  onCheckout: MouseEventHandler<HTMLDivElement>;
}

const PlanCard = ({ onCheckout }: Props) => {
  return (
    <div className="w-80 card__container p-6 mb-10 drop-shadow-md ">
      <div className="z-40">
        <div className="flex justify-between items-end mb-4">
          <div className="text-2xl">Standard</div>
          <div></div>
          <div>100$</div>
        </div>
        <div className="h-72">
          <div className="flex justify-between text-sm mb-1 pb-1">
            <div>No limited limitedlimited limited limited</div>
            <div className="text-2xl text-green-400">
              {' '}
              <AiFillLike />
            </div>
          </div>
          <div className="flex justify-between text-sm mb-1 pb-1">
            <div>No limited</div>
            <div className="text-2xl text-green-400">
              {' '}
              <AiFillLike />
            </div>
          </div>
          <div className="flex justify-between text-sm mb-1  pb-1">
            <div>No limited</div>
            <div className="text-2xl text-green-400">
              {' '}
              <AiFillLike />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* @ts-ignore */}
          <Button onClick={() => onCheckout('Plan 1 ne')} className="medium">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
