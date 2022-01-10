import React, { ReactElement, useState } from 'react';
import Comment from './CommentCard';
import InputComment from './InputComment';
import { leaveComment } from 'module/comment/commentModule';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/loader';
import { IComment } from 'interfaces/Comment';
import { FixMeLater } from 'interfaces/Migrate';

interface Props {
  comments: IComment[] | null;
  movieID: string;
  updateComments?: FixMeLater;
}

export default function Comments({
  comments,
  movieID,
  updateComments,
}: Props): ReactElement {
  const [commentValue, setCommentValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleCreateComment = () => {
    if (commentValue) {
      dispatch(setLoading(true));
      leaveComment(commentValue, movieID).then((data: FixMeLater) => {
        setCommentValue('');
        if (comments) {
          let newListComments = [...comments];
          newListComments.unshift(data);
          updateComments(newListComments);
        }
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
