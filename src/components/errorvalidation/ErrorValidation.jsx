import React from 'react';

export default function ErrorValidation(props) {
  return (
    <>
      <span className="text-sm text-red-600">{props.children}</span>
    </>
  );
}
