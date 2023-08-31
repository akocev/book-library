import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss'],
})
export class SearchBookComponent implements OnInit {
  @Output() submittedSearchTerm: EventEmitter<string | undefined> =
    new EventEmitter<string | undefined>();

  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let searchParam = this.route.snapshot.queryParams['search'];
    if (searchParam) {
      this.searchForm.controls['searchTerm'].setValue(searchParam);
      this.submittedSearchTerm.next(searchParam);
    }
  }

  public searchBook(): void {
    if (this.searchForm.value.searchTerm) {
      this.router.navigate(['/search'], {
        queryParams: { search: this.searchForm.value.searchTerm },
      });
      this.submittedSearchTerm.next(this.searchForm.value.searchTerm);
    } else {
      this.submittedSearchTerm.next(undefined);
      this.router.navigate(['/search']);
    }
  }
}
