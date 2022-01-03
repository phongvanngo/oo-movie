import React, { ReactChild, ReactChildren, ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './chappter.scss';

interface Props {
  link: string;
  children?: ReactChild | ReactChildren;
  isActive?: boolean;
}

export default function Chappter(props: Props): ReactElement {
  const history = useHistory();
  return (
    <>
      <div
        onClick={() => history.push(props.link)}
        className={`chappter ${props.isActive && 'chappter-active'}`}
      >
        <span className="noselect">{props.children}</span>
      </div>
    </>
  );
}
