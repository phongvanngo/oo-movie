import React, { ReactElement } from 'react';
import CommentCard from './CommentCard';
import InputComment from './InputComment';

interface Props {}

export default function Comments({}: Props): ReactElement {
  return (
    <div>
      <div>
        <InputComment />
      </div>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </div>
  );
}
