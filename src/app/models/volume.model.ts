import { Image } from './image.model';
export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  mainCategory: string;
  imageLinks?: Image;
  infoLink: string;
  averageRating: number;
}
