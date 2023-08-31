import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  { path: 'books', component: BooksPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
