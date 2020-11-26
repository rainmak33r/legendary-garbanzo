export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  authors: string[];
  description: string;
  categories: string[];
  imageLinks?: ImageLinks;
  averageRating: number;
  title: string;
  subtitle: string;
  ratingsCount: number;
}

interface ImageLinks {
  extraLarge: string;
  large: string;
  medium: string;
  small: string;
  smallThumbnail: string;
  thumbnail: string;
}
