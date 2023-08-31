import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import {
  getBooks,
  searchTermSubmitted,
} from 'src/app/state/books/books.actions';
import { getAllBooks } from 'src/app/state/books/books.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]> = new Observable<Book[]>();
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(searchTermSubmitted({ searchTerm: '' }));
    this.store$.dispatch(getBooks());
    this.books$ = this.store$.select(getAllBooks);
  }
}
