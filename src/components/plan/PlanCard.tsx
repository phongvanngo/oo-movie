import React, { MouseEventHandler } from 'react';
import './plan-card.scss';
import { AiFillLike } from 'react-icons/ai';
import Button from 'components/button/Button';
import { IPLan } from 'interfaces/Plan';
import { FixMeLater } from 'interfaces/Migrate';

interface Props {
  onCheckout: FixMeLater;
  plan: IPLan;
}

const PlanCard = ({ onCheckout, plan }: Props) => {
  return (
    <div className="w-80 card__container p-6 mb-10 drop-shadow-md ">
      <div className="z-40">
        <div className="flex justify-between items-end mb-4">
          <div className="text-2xl">{plan?.title}</div>
          <div className="text-xl underline italic">${plan.price}</div>
        </div>
        <div className="h-72">
          <div className="flex justify-between text-sm mb-1 pb-1">
            <div>{plan?.description}</div>
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
          <Button onClick={() => onCheckout(plan)} className="medium">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
