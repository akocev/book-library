import { Book } from 'src/app/models/book.model';

export interface BooksState {
  books: Book[];
  selectedBook: Book;
  searchTerm: string | undefined;
  latestBooks: Book[];
}

export const initialState: BooksState = {
  books: [],
  selectedBook: {} as Book,
  searchTerm: '',
  latestBooks: [],
};
