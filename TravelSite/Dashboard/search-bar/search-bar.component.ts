import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.emit(inputElement.value);
  }
}
