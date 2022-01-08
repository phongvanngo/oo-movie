import React, { ReactElement, useState } from 'react';
import Comment from './CommentCard';
import InputComment from './InputComment';
import { IComment } from 'interfaces/MovideDetail';
import userCommentApi from 'api/oomovie/userCommentApi';
import { leaveComment } from 'module/comment/comment';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/loader';

interface Props {
  comments: IComment[];
  movieID?: string;
}

export default function Comments({ comments, movieID }: Props): ReactElement {
  const [commentValue, setCommentValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleCreateComment = () => {
    if (commentValue) {
      dispatch(setLoading(true));
      leaveComment(commentValue, movieID).then(() => {
        setCommentValue('');
        dispatch(setLoading(false));
      });
    }
  };

  return (
    <div>
      <InputComment
        handleComment={handleCreateComment}
        textValue={commentValue}
        setTextValue={setCommentValue}
      />
      <div>
        {comments &&
          comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        {!comments && <div>No one comments</div>}
      </div>
    </div>
  );
}
