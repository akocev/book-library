import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { getBookById } from 'src/app/state/books/books.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  book$: Observable<Book> = this.store$.select(getBookById);

  constructor(private store$: Store<AppState>) {}
}
