import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  httpClient = inject(HttpClient);

  getAll(page: number, city?: string, startDate?: Date, endDate?: Date) {
    const currentDate = this.formatDate(new Date);
    const formattedStartDate = startDate ? this.formatDate(startDate) : currentDate;
    const formattedEndDate = endDate ? this.formatDate(endDate) : "";
    const queryParams = this.generateQueryString(city, formattedStartDate, formattedEndDate);

    const { apiKey, apiUrl } = environment

    return this.httpClient.get<any>(`${apiUrl}?apikey=${apiKey}&page=${page}${queryParams}`)
  }

  formatDate(date: Date) {
    return date.toISOString().replace(/\.\d+/, '');
  };


  //in a big project we can create a generic queryString 
  //function for any properties as a params
  generateQueryString(city?: string, startDate?: string, endDate?: string) {
    let url = "";
    if (city) url += `&city=${city}`;
    //API expected date format: "2024-12-31T13:20:00Z"
    if (startDate) url += `&startDateTime=${startDate}`;
    if (endDate) url += `&endDateTime=${endDate}`;

    return url;
  }
}
