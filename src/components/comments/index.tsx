import React, { ReactElement } from 'react';
import Comment from './CommentCard';
import InputComment from './InputComment';
import { ICommentData } from 'interfaces/MovideDetail';

export default function Comments({ comments }: ICommentData): ReactElement {
  return (
    <div>
      <InputComment />
      <div>
        {comments &&
          comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
      </div>
    </div>
  );
}
