import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookListingComponent } from './components/book-listing/book-listing.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { TabsMenuComponent } from './components/tabs-menu/tabs-menu.component';
import { BookService } from './services/books.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-router-serializer';
import { BooksEffects } from './state/books/books.effects';
import { HttpClientModule } from '@angular/common/http';
import { PushModule } from '@ngrx/component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBookComponent } from './components/search-book/search-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListingComponent,
    BookDetailsComponent,
    BooksPageComponent,
    TabsMenuComponent,
    SearchPageComponent,
    SearchBookComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PushModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([BooksEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
