import React, { ReactElement } from 'react';
import Chappter from './Chappter';

interface Props {}

export default function MovieChappers({}: Props): ReactElement {
  return (
    <>
      <div className="chappter__container">
        <Chappter link="#">1</Chappter>
        <Chappter link="#">2</Chappter>
        <Chappter link="#">3</Chappter>
      </div>
    </>
  );
}
