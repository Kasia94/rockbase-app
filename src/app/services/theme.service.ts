import { Inject, Injectable, DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = true;

  constructor(@Inject(DOCUMENT) private document: Document) {
    document.body.classList.add('dark-mode');
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  get isDarkMode(): boolean {
    return this.darkMode;
  }
}
