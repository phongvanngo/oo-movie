import React, { ReactElement } from 'react';
import CommentCard from './CommentCard';

interface Props {}

export default function Comments({}: Props): ReactElement {
  return (
    <div>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </div>
  );
}
