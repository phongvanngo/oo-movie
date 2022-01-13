import React, { ReactElement, useState } from 'react';
import Comment from './CommentCard';
import InputComment from './InputComment';
import { leaveComment } from 'module/comment/commentModule';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setLoading } from 'redux/reducer/loader';
import { IComment } from 'interfaces/Comment';
import { FixMeLater } from 'interfaces/Migrate';
import { useHistory } from 'react-router-dom';
import Modal, { ModalWithButton } from 'components/modal/Modal';
import { selectorUser } from 'redux/reducer/authenticateSlice';

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
  const userAuth = useAppSelector(selectorUser);

  const history = useHistory();

  const handleCreateComment = () => {
    if (commentValue) {
      dispatch(setLoading(true));
      leaveComment(commentValue, movieID)
        .then((data: FixMeLater) => {
          setCommentValue('');
          if (comments) {
            let newListComments = [...comments];
            let newdata = { ...data };
            if (userAuth?.displayName !== data?.user.fullname) {
              newdata = {
                ...data,
                user: {
                  ...data?.user,
                  fullname: userAuth?.displayName,
                },
              };
            }
            newListComments.unshift(newdata);
            updateComments(newListComments);
          }
        })
        .catch(() => {
          setModalVisible();
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const setModalVisible = () => {
    const modal = document.querySelector(`#Notification`);
    if (modal) {
      modal.classList.toggle('active');
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
          comments.length > 0 &&
          comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        {comments && comments.length <= 0 && <div>No one comments</div>}
      </div>

      {/* @ts-ignore */}
      <Modal active={false} id="Notification">
        {/* @ts-ignore */}
        <ModalWithButton
          onOk={() => history.push('/sign-in')}
          okContent="Sign in"
        >
          <div className="flex justify-center items-center text-xl text-center">
            <div>Please sign in to proceed the action</div>
          </div>
        </ModalWithButton>
      </Modal>
    </div>
  );
}
