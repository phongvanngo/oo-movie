import userCommentApi from 'api/oomovie/userCommentApi';

export const leaveComment = async (commentValue, movieID) => {
  console.log(movieID);
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

export const getListComments = async (id) => {
  try {
    const response = await userCommentApi.getCommentByMovieID({
      params: { movie_id: id },
    });

    return Promise.resolve(response.data);
  } catch (error) {}
};
