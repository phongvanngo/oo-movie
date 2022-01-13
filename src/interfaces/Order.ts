import { User } from './User';

export interface Movie {
  id: string;
  name: string;
  price?: number;
}

export interface Discount {
  id: string;
  name: string;
  description: string;
  remaining_amount: number;
  time_begin: number;
  time_end: number;
  value: number;
  code: string;
  enabled: boolean;
}

export interface Order {
  id: string;
  user: User;
  discount: Discount;
  plan?: any;
  movies: Movie[] | [];
  order_time: number;
  total: number;
  enabled: boolean;
  is_plan: boolean;
}
