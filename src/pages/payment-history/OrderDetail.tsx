import { FixMeLater } from 'interfaces/Migrate';
import { Order } from 'interfaces/Order';
import React, { ReactElement } from 'react';
import { numberToDate } from 'utils/commonConvert';

interface Props {
  order: Order | null;
  user: FixMeLater;
}

export default function OrderDetail({ order, user }: Props): ReactElement {
  const orderTime = numberToDate(order?.order_time as number);
  return (
    <div className="flex flex-col ">
      <div className="flex justify-center items-center text-xl font-semibold text-center mb-4">
        <div>Order detail #{order?.id.substring(0, 6)}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex-1">
          <div className="font-semibold text-center">Customer information</div>
          <div className="mb-1.5">
            <span className="underline">Name:</span> {order?.user.fullname}
          </div>
          <div className="mb-1.5">
            <span className="underline">Email:</span> {user?.email}
          </div>
          <div className="mb-1.5">
            <span className="underline">Order date:</span> {orderTime}
          </div>
        </div>

        <div className="flex-1"></div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex-1">
          <div className="font-semibold text-center">Purchased Item</div>
          {order?.is_plan && (
            <div className="mb-1.5">
              <span className="underline">Name:</span> {order?.plan.name}
            </div>
          )}
          {!order?.is_plan && (
            <div className="mb-1.5">
              <span className="underline">Name:</span> {order?.movies[0].name}
            </div>
          )}
          <div className="mb-1.5">
            <span className="underline">Price:</span> {order?.total}
          </div>
        </div>

        <div className="flex-1">
          <div className="font-semibold text-center">Discount</div>
          <div className="mb-1.5">
            <span className="underline">Name:</span>{' '}
            {order?.discount ? order.discount.name : 'None'}
          </div>
          <div className="mb-1.5">
            <span className="underline">Value:</span>{' '}
            {order?.discount ? `${order.discount.value}%` : 'None'}
          </div>
        </div>
      </div>
      <hr className="mt-2"></hr>
      <div className="self-end mt-2">
        <div>Sub-total: 100</div>
        <div>Total: {order?.total}</div>
      </div>
    </div>
  );
}
