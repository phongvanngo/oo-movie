import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement } from 'react';
import './button.scss';

interface Props {
  onClick?: FixMeLater;
  typeButton?: 'primary' | 'secondary';
  content: string;
}

export default function SubmitButton({
  typeButton = 'primary',
  content,
  onClick,
}: Props): ReactElement {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (typeButton === 'primary') {
    return (
      <button
        className="button__submit button__submit-primary"
        onClick={handleOnClick}
      >
        {content}
      </button>
    );
  } else {
    return (
      <button
        className="button__submit button__submit-secondary"
        onClick={handleOnClick}
      >
        {content}
      </button>
    );
  }
}
