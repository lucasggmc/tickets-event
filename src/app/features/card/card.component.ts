import { Component, Input } from '@angular/core';
import { Event } from '../../shared/interfaces/event.interface';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() event!: Event;


  getImage() {
    //I added a fallback if we don't have the ratio 3_2
    return this.event.images.find(img => img.ratio === "3_2")?.url || this.event.images[0].url;
  }

  getPriceRange() {
    const priceRanges = this.event?.priceRanges;
    return `$${priceRanges ? this.event?.priceRanges[0].min : "Uninformed"} - $${priceRanges ? this.event?.priceRanges[0]?.max : "Uninformed"}`
  }

  getDate() {
    return `${this.event.dates.start.localDate} - ${this.event.dates.start?.localTime || "Uninformed"}`
  }

  getLocale() {
    return this.event?._embedded?.venues?.[0]?.city?.name;
  }

}
