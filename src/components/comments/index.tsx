import React, { ReactElement } from 'react';
import Comment from './CommentCard';
import InputComment from './InputComment';

interface Props {}

const commentData = {
  title: 'Fake article title.',
  author: 'grzm',
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

export default function Comments({}: Props): ReactElement {
  return (
    <div>
      <div>
        <InputComment />
      </div>
      <div>
        {/* <Comment comments={commentData} /> */}
        {commentData.comments.map((comment) => {
          return <Comment key={comment.id} comments={comment} />;
        })}
      </div>
    </div>
  );
}
