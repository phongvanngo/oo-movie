import { IComment } from 'interfaces/Comment';

export const filterDisplayComments = (
  listComments: IComment[],
  userID: string
) => {
  console.log(userID);
  return listComments.filter(
    (comment) => comment.user.id === userID || comment.status === 'Accept'
  );
};
