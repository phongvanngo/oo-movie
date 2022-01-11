export interface User {
  id: string;
  name: string;
}

export interface IComment {
  id: string;
  content: string;
  user: User;
  time: number;
  status: string;
  movie_id: string;
}
