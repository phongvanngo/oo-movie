import ErrorValidation from 'components/errorvalidation/ErrorValidation';
import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement } from 'react';
import Cards, { ReactCreditCardProps } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from 'utils/FormatPaymentCard';

interface Props {
  cardProps: ReactCreditCardProps;
  setCardProps: React.Dispatch<React.SetStateAction<ReactCreditCardProps>>;
  form?: FixMeLater;
}

export default function PaymentCard({
  cardProps,
  setCardProps,
  form,
}: Props): ReactElement {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

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
      <form className="flex flex-col" onSubmit={form.handleSubmit()}>
        <div className="payment__input__wrapper">
          <div className="payment__input__wrapper-label">Cardholder Name</div>
          <input
            type="text"
            className="payment__input__wrapper-content"
            {...register('name', { required: true })}
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {errors.name && (
            <ErrorValidation>This field is required</ErrorValidation>
          )}
        </div>

        <div className="payment__input__wrapper flex justify-between">
          <div className="w-1/2">
            <div className="payment__input__wrapper-label">Card number</div>

            <input
              className="payment__input__wrapper-content"
              type="tel"
              {...register('number', { required: true })}
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {errors.number && (
              <ErrorValidation>This field is required</ErrorValidation>
            )}
          </div>

          <div className="w-1/5">
            <div className="payment__input__wrapper-label">Date</div>
            <input
              type="tel"
              className="payment__input__wrapper-content"
              {...register('expiry', { required: true })}
              name="expiry"
              placeholder="Expiry"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {errors.expiry && <ErrorValidation>Required</ErrorValidation>}
          </div>

          <div className="w-1/5">
            <div className="payment__input__wrapper-label">CVC</div>
            <input
              type="tel"
              className="payment__input__wrapper-content"
              {...register('cvc', { required: true })}
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {errors.cvc && <ErrorValidation>Required</ErrorValidation>}
          </div>
        </div>
      </form>
    </div>
  );
}
