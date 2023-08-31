import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BookService } from '../../services/books.service';
import {
  noResultsFound,
  getBooks,
  getBooksByIdSuccess,
  getBooksSuccess,
  getLatestBooks,
  getLatestBooksSuccess,
} from './books.actions';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { getAllBooks, getBookById, getSearchTerm } from './books.selector';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { AppState } from '../../store/app.state';

export const MAX_SEARCH_RESULTS_NUM = 40;
export const SEARCH_RESULTS_BY_PAGE_NUM = 10;
export const LATEST_BOOKS_RESULTS_NUM = 3;

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private store: Store<AppState>,
  ) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBooks),
      withLatestFrom(
        this.store.select(getAllBooks),
        this.store.select(getSearchTerm),
      ),
      mergeMap(([, books, searchTerm]) => {
        if (books) {
          const searchQuery = searchTerm ? searchTerm : 'subject:science';
          const maxResults = searchTerm
            ? MAX_SEARCH_RESULTS_NUM
            : SEARCH_RESULTS_BY_PAGE_NUM;
          return this.bookService.search(searchQuery, maxResults).pipe(
            map((books) => {
              return getBooksSuccess({ books });
            }),
          );
        }
        return of(noResultsFound());
      }),
    );
  });

  loadLatestBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLatestBooks),
      withLatestFrom(this.store.select(getLatestBooks)),
      mergeMap(([, books]) => {
        if (books) {
          const query = 'subject:new';
          const maxResults = LATEST_BOOKS_RESULTS_NUM;
          return this.bookService.search(query, maxResults).pipe(
            map((books) => {
              return getLatestBooksSuccess({ books });
            }),
          );
        }
        return of(noResultsFound());
      }),
    );
  });

  getBookById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/book');
      }),
      map((r: RouterNavigatedAction) => {
        const routerState = r.payload.routerState as any;
        return routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getBookById)),
      switchMap(([id]) => {
        if (!!id) {
          return this.bookService.getById(id).pipe(
            map((book) => {
              const bookData = { ...book, id };
              return getBooksByIdSuccess({ book: bookData });
            }),
          );
        }
        return of(noResultsFound());
      }),
    );
  });
}
