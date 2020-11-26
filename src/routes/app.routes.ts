import { APP_URLS } from './app.urls';
import Home from '../pages/home';
import BookDetails from '../pages/book-details';
import Shelves from '../pages/shelves';
import ShelveDetails from '../pages/shelve-details';

export const APP_ROUTES = [
  {
    exact: true,
    path: APP_URLS.home,
    component: Home,
  },
  {
    exact: true,
    path: APP_URLS.bookDetails,
    component: BookDetails,
  },
  {
    exact: true,
    path: APP_URLS.shelves,
    component: Shelves,
  },
  {
    exact: true,
    path: APP_URLS.shelveDetails,
    component: ShelveDetails,
  },
];
