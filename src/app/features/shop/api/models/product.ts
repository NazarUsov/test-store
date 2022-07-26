import { User } from './user';

export interface Product {
  id: number;
  user: User;
  img: string;
  alt: string;
  description: string;
}
