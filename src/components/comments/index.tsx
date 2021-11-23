import React, { ReactElement } from 'react';
import Comment from './CommentCard';
import InputComment from './InputComment';
import { IComment } from 'interfaces/MovideDetail';

interface Props {}

const commentData = {
  comments: [
    {
      id: 1,
      text: 'Example comment here.',
      author: 'user2',
      children: [
        {
          id: 2,
          text: 'Another example comment text.',
          author: 'user3',
        },
      ],
    },
    {
      id: 4,
      text: 'Example comment here 2.',
      author: 'user5',
      children: [],
    },
  ],
};

export default function Comments({ comments }: IComment): ReactElement {
  return (
    <div>
      <InputComment />
      <div>
        {commentData.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
}
