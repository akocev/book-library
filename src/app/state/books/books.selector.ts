import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.state';

const booksState = createFeatureSelector<BooksState>('books');

export const getAllBooks = createSelector(booksState, (state) => {
  return state.books;
});

export const getBookById = createSelector(booksState, (state) => {
  return state.selectedBook;
});

export const getSearchTerm = createSelector(booksState, (state) => {
  return state.searchTerm;
});

export const getAllLatestBooks = createSelector(booksState, (state) => {
  return state.latestBooks;
});
