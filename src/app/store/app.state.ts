import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { booksReducer } from '../state/books/books.reducer';
import { BooksState } from '../state/books/books.state';

export interface AppState {
  books: BooksState;
  router: RouterReducerState;
}

export const appReducer = {
  books: booksReducer,
  router: routerReducer,
};
