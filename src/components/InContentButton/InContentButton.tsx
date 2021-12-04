import React, { EventHandler, ReactChild, ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  eventHandler?: React.MouseEventHandler<HTMLDivElement>;
}

export default function InContentButton({
  className,
  children,
  eventHandler,
}: Props): ReactElement {
  return (
    <div
      className={`w-full p-2 text-center border border-white rounded-2xl cursor-pointer hover:bg-white hover:text-black transition duration-300 font-semibold ${className}`}
      onClick={eventHandler}
    >
      {children}
    </div>
  );
}
