import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideNgbCarousel } from '@ng-bootstrap/ng-bootstrap';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...appConfig.providers, provideHttpClient(), provideNgbCarousel()],
}).catch((err) => console.error(err));
