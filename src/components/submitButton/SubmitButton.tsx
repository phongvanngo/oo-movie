import React, { ReactElement } from 'react';
import './button.scss';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  typeButton?: 'primary' | 'secondary';
  content: string;
}

export default function SubmitButton({
  typeButton = 'primary',
  content,
  onClick,
}: Props): ReactElement {
  if (typeButton === 'primary') {
    return (
      <button className="button__submit button__submit-primary">
        {content}
      </button>
    );
  } else {
    return (
      <button className="button__submit button__submit-secondary">
        {content}
      </button>
    );
  }
}
