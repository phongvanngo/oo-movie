import React, { ReactChild, ReactChildren, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './chappter.scss';

interface Props {
  link: string;
  children?: ReactChild | ReactChildren;
}

export default function Chappter(props: Props): ReactElement {
  return (
    <>
      <Link to={props.link} className="chappter">
        <span className="noselect">{props.children}</span>
      </Link>
    </>
  );
}
