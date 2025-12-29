import { isPlatformBrowser } from '@angular/common';
import { Injectable, DOCUMENT, inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = true;
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  initTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.updateTheme();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private updateTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.document.body.classList.toggle('dark-mode', this.darkMode);
  }

  get isDarkMode(): boolean {
    return this.darkMode;
  }
}
