import { Component, inject } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Event } from '../../shared/interfaces/event.interface';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SearchFilter } from '../../shared/interfaces/search-filter.interface';
import { CardComponent } from "../card/card.component";


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatPaginatorModule, SearchBarComponent, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  eventService = inject(EventsService);
  events?: Event[]

  totalItems: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;
  city?: string;
  startDate: Date | undefined;
  endDate: Date | undefined;

  ngOnInit() {
    this.getEvents();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getEvents(event.pageIndex, this.city, this.startDate, this.endDate);
  }

  getEvents(page?: number, searchCity?: string, startDate?: Date, endDate?: Date) {
    this.eventService.getAll(page || this.currentPage, searchCity, startDate, endDate).subscribe((data) => {
      const { _embedded, page: { totalPages } } = data;
      this.events = _embedded.events;
      this.totalItems = totalPages;
    });
  }

  handleSearch(searchFilter: SearchFilter) {

    //TODO: it's sounds not the best approach to me
    //with more time I would like to make a refactor
    this.city = searchFilter.city;
    this.startDate = searchFilter.startDate;
    this.endDate = searchFilter.endDate;

    this.getEvents(
      this.currentPage,
      searchFilter.city,
      searchFilter.startDate,
      searchFilter.endDate
    );
  }
}