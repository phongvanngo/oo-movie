import TheMovieDb from "@leonardocabeza/the-movie-db";

const v3ApiKey = "54aa709695ac2db22242917da035c1fa";
const v3Client = new TheMovieDb(v3ApiKey);

const { movie, search } = v3Client;

export default v3Client;

export { movie, search };
