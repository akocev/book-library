import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  private apiUrl = environment.booksBaseUrl;

  constructor(private http: HttpClient) {}

  public search(query: string, maxResults: number): Observable<Book[]> {
    let options = new HttpParams();
    options = new HttpParams()
      .set('q', query)
      .set('startIndex', 0)
      .set('maxResults', maxResults);
    return this.http
      .get<{ items: Book[] }>(this.apiUrl, { params: options })
      .pipe(
        map((books) => books.items),
        filter((items) => items.length > 0),
      );
  }

  public getById(volumeId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${volumeId}`);
  }
}
