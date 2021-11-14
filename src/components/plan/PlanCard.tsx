import React from 'react';
import './plan-card.scss';
import { AiFillLike } from 'react-icons/ai';

interface Props {
  //   name: string;
  //   price: number;
  //   content: string[];
  //   link: string;
}

const PlanCard = (props: Props) => {
  return (
    <div className="w-80 card__container p-6 mb-10 drop-shadow-md">
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
          <div className="border cursor-pointer border-white px-8 py-2 rounded-full hover:bg-primary hover:border-opacity-0 hover:scale-105 transform transition duration-300">
            Subscribe
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
