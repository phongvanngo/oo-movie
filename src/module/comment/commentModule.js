import userCommentApi from 'api/oomovie/userCommentApi';

export const leaveComment = async (commentValue, movieID) => {
  const token = localStorage.getItem('ootoken');
  if (token) {
    const data = {
      movie_id: movieID,
      content: commentValue,
    };
    try {
      const response = await userCommentApi.createComment(data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  return Promise.reject('Please sign in to comment');
};

export const getListComments = async (id) => {
  try {
    const response = await userCommentApi.getCommentByMovieID({
      params: { movie_id: id },
    });

    return Promise.resolve(response.data);
  } catch (error) {}
};
