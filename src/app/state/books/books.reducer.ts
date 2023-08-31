import { createReducer, on, Action } from '@ngrx/store';
import {
  getBooksByIdSuccess,
  getBooksSuccess,
  getLatestBooksSuccess,
  searchTermSubmitted,
} from './books.actions';
import { BooksState, initialState } from './books.state';

const _booksReducer = createReducer(
  initialState,
  on(getBooksSuccess, (state, action) => {
    return {
      ...state,
      books: action.books,
    };
  }),
  on(getLatestBooksSuccess, (state, action) => {
    return {
      ...state,
      latestBooks: action.books,
    };
  }),
  on(getBooksByIdSuccess, (state, action) => {
    return {
      ...state,
      selectedBook: action.book,
    };
  }),
  on(searchTermSubmitted, (state, { searchTerm }) => {
    return {
      ...state,
      searchTerm,
    };
  }),
);

export function booksReducer(
  state: BooksState | undefined,
  action: Action,
): BooksState {
  return _booksReducer(state, action);
}
