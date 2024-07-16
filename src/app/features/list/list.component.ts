import { Component, inject } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  eventService = inject(EventsService);
  events?: any


  ngOnInit() {
    this.getEvents(0);
  }

  getEvents(page?: number, searchCity?: string, startDate?: Date, endDate?: Date) {
    this.eventService.getAll(page || 0, searchCity, startDate, endDate).subscribe((data) => {
      const { _embedded } = data;
      this.events = _embedded.events;
    });
  }

}
