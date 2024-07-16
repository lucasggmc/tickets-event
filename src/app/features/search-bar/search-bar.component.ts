import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchFilter } from '../../shared/interfaces/search-filter.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() handleSearch = new EventEmitter<SearchFilter>();

  form = new FormGroup({
    searchCity: new FormControl<string>(""),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null)
  })

  onSubmit() {
    const city = this.form.controls.searchCity.value || "";
    const startDate = this.form.get("startDate")?.value || undefined;
    const endDate = this.form.get("endDate")?.value || undefined;

    //avoid searches with no filters
    if (city || startDate || endDate) {
      const searchFilter: SearchFilter = {
        city,
        startDate,
        endDate
      }

      this.handleSearch.emit(searchFilter);
    }
  }

}