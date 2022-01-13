import { FixMeLater } from 'interfaces/Migrate';
import { RouterParams } from 'interfaces/Route';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Chappter from './Chappter';
import queryString from 'query-string';
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
  const value = queryString.parse(location.search);
  const episode = value.episode;

  useEffect(() => {
    // console.log('rerender', selectedChappter);
    console.log(chappters);
  }, [selectedChappter, chappters]);

  return (
    <>
      <div className="chappter__container">
        {chappters &&
          chappters.map((chappter, index) => {
            const link = `${location.pathname}?episode=${chappter.name}`;
            return (
              <Chappter
                link={link}
                key={index}
                isActive={chappter.id === selectedChappter?.id}
              >
                {index + 1}
              </Chappter>
            );
          })}
      </div>
    </>
  );
}
