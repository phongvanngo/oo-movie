import { IComment } from 'interfaces/Comment';
import { FixMeLater } from 'interfaces/Migrate';

export const filterDisplayComments = (listComments: IComment[]) => {
  if (listComments) {
    let user: FixMeLater = JSON.parse(
      localStorage.getItem('user') as FixMeLater
    );
    const filteredComments = listComments.filter(
      (comment) => comment.user.id === user?.id || comment.status === 'Accept'
    );
    return filteredComments.slice(0).reverse();
  }
  return [];
};
