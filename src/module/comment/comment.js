import userCommentApi from 'api/oomovie/userCommentApi';

export const leaveComment = async (commentValue, movieID) => {
  const data = {
    movie_id: movieID,
    content: commentValue,
  };
  try {
    const response = await userCommentApi.createComment(data);
    return Promise.resolve(response.status);
  } catch (error) {
    console.log(error);
  }
};
