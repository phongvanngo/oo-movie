import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement, useState } from 'react';
import Cards, { ReactCreditCardProps, Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from 'utils';

interface Props {
  cardProps: ReactCreditCardProps;
  setCardProps: React.Dispatch<React.SetStateAction<ReactCreditCardProps>>;
}

export default function PaymentCard({
  cardProps,
  setCardProps,
}: Props): ReactElement {
  const handleCallback = (
    { issuer }: { issuer: FixMeLater },
    isValid: FixMeLater
  ) => {
    if (isValid) {
      setCardProps({ ...cardProps, [issuer]: issuer });
    }
  };

  const handleInputFocus = (e: FixMeLater) => {
    setCardProps({ ...cardProps, focused: e.target.name });
  };

  const handleInputChange = ({ target }: FixMeLater) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }
    setCardProps({ ...cardProps, [target.name]: target.value });
  };

  return (
    <div>
      <div className="mb-6">
        <Cards
          cvc={cardProps.cvc}
          expiry={cardProps.expiry}
          focused={cardProps.focused}
          name={cardProps.name}
          number={cardProps.number}
          callback={handleCallback}
        />
      </div>
      <form className="flex flex-col ">
        <div className="payment__input__wrapper">
          <div className="payment__input__wrapper-label">Cardholder Name</div>
          <input
            type="text"
            className="payment__input__wrapper-content"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>

        <div className="payment__input__wrapper flex justify-between">
          <div className="w-1/2">
            <div className="payment__input__wrapper-label">Card number</div>

            <input
              className="payment__input__wrapper-content"
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          <div className="w-1/5">
            <div className="payment__input__wrapper-label">Date</div>
            <input
              type="tel"
              className="payment__input__wrapper-content"
              name="expiry"
              placeholder="Expiry"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          <div className="w-1/5">
            <div className="payment__input__wrapper-label">CVC</div>
            <input
              type="tel"
              className="payment__input__wrapper-content"
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
