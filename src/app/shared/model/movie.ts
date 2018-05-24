import { Metadata } from './metadata';
import { Content } from './content';
import { Credit } from './credit';
import { ParentalRating } from './parental-rating';
import { Image } from './image';
import { Category } from './category';

export class Movie {
  id: string;
  title: string;
  description: string;
  type: string;
  publishedDate: number;
  availableDate: number;
  metadata: Metadata[];
  contents: Content[];
  credits: Credit[];
  parentalRatings: ParentalRating[];
  images: Image[];
  categories: Category[];
}
