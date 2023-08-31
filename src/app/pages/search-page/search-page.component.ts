import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import {
  getBooks,
  searchTermSubmitted,
  getLatestBooks,
} from 'src/app/state/books/books.actions';
import {
  getAllBooks,
  getAllLatestBooks,
  getSearchTerm,
} from 'src/app/state/books/books.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  books$: Observable<Book[]> = new Observable<Book[]>();
  searchTerm$: Observable<string | undefined> = new Observable<undefined>();
  newReleases$: Observable<Book[]> = new Observable<Book[]>();

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(searchTermSubmitted({ searchTerm: '' }));
    this.store$.dispatch(getLatestBooks());
    this.newReleases$ = this.store$.select(getAllLatestBooks);
  }

  public searchBook(searchTerm: string | undefined): void {
    this.store$.dispatch(searchTermSubmitted({ searchTerm: searchTerm }));
    this.searchTerm$ = this.store$.select(getSearchTerm);
    this.store$.dispatch(getBooks());
    this.books$ = this.store$.select(getAllBooks);
  }
}
