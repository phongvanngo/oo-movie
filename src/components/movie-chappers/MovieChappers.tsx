import { FixMeLater } from 'interfaces/Migrate';
import { RouterParams } from 'interfaces/Route';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Chappter from './Chappter';

interface Props {
  chappters: Ichappter[];
  selectedChappter?: FixMeLater;
}

interface Ichappter {
  id: string;
  name: string;
  content: string;
  ordinal: number;
  view_count: number;
  enabled: boolean;
}

export default function MovieChappers({
  chappters,
  selectedChappter,
}: Props): ReactElement {
  const location = useLocation();

  return (
    <>
      <div className="chappter__container">
        {chappters &&
          selectedChappter &&
          chappters.map((chappter, index) => {
            const link = `${location.pathname}?episode=${chappter.name}`;

            if (chappter.name === selectedChappter?.name) {
              return (
                <Chappter link={link} key={index} isActive>
                  {chappter.ordinal}
                </Chappter>
              );
            } else {
              return (
                <Chappter link={link} key={index}>
                  {chappter.ordinal}
                </Chappter>
              );
            }
          })}
      </div>
    </>
  );
}
