import { Component, inject } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  eventService = inject(EventsService);
  events?: any

  totalItems: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;

  ngOnInit() {
    this.getEvents(0);
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getEvents(event.pageIndex);
  }

  getEvents(page?: number, searchCity?: string, startDate?: Date, endDate?: Date) {
    this.eventService.getAll(page || this.currentPage, searchCity, startDate, endDate).subscribe((data) => {
      const { _embedded, page: { totalPages } } = data;
      this.events = _embedded.events;
      this.totalItems = totalPages;
    });
  }

}
