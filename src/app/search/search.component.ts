import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() searchPhrase = new EventEmitter<string>();

  query = '';

  onSearch() {
    const value = this.query.trim();
    if (!value) return;

    this.searchPhrase.emit(value);
  }
}
