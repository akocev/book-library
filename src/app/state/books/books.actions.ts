import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book.model';

export const getBooks = createAction('[Books Page] Request books');
export const getBooksSuccess = createAction(
  '[Books Page] Get all books success',
  props<{ books: Book[] }>(),
);
export const getLatestBooks = createAction('[Books Page] Request latest books');
export const getLatestBooksSuccess = createAction(
  '[Books Page] Get latest books success',
  props<{ books: Book[] }>(),
);
export const getBooksByIdSuccess = createAction(
  '[Books Details] Get book by id success',
  props<{ book: Book }>(),
);
export const searchTermSubmitted = createAction(
  '[Search page] Searching book',
  props<{ searchTerm: string | undefined }>(),
);

export const noResultsFound = createAction(
  '[Books Library app] No results found',
);
