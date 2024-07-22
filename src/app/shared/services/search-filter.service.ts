import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchFilter } from '../interfaces/search-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  private filterSubject = new BehaviorSubject<SearchFilter>({ city: '', startDate: undefined, endDate: undefined });

  setFilter(filter: SearchFilter): void {
    this.filterSubject.next(filter);
  }

  getFilter(): Observable<SearchFilter> {
    return this.filterSubject.asObservable();
  }

  constructor() { }
}
