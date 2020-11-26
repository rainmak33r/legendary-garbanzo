export interface Shelve {
  name: string;
  category: string;
  books?: string[];
  review?: ShelveReview;
}

export interface ShelveReview {
  message: string;
  rate: number;
}

export const LS_SHELVES_KEY = 'shelves';
