import PageHeader from 'components/page-header/PageHeader';
import React, { ReactElement, useState } from 'react';
import { ReactCreditCardProps } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import PaymentCard from './PaymentCard';
import './checkout.scss';
import Button from 'components/button/Button';

interface Props {}

export default function Checkout({}: Props): ReactElement {
  const [cardProps, setCardProps] = useState<ReactCreditCardProps>({
    cvc: '',
    expiry: '',
    focused: undefined,
    name: '',
    number: '',
    issuer: '',
  });

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
          <div className="pb-4">
            <div className="flex justify-between mb-4 ">
              <div>Christmas Plan v2</div>
              <div>$30</div>
            </div>
            <div className="flex justify-between mb-4 ">
              <div>Christmas Plan v2</div>
              <div>$30</div>
            </div>
            <div className="flex justify-between mb-4 ">
              <div>Promotion code - KSHARKINC</div>
              <div>-$30</div>
            </div>
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
              />
              <div className="promotion__button promotion__button-small">
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

          <div className="promotion__button promotion__button-big">
            Check out
          </div>
        </div>
      </div>
    </>
  );
}
