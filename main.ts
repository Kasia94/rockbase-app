import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './src/app/app.config';
import { AppComponent } from './src/app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...appConfig.providers, provideHttpClient()],
}).catch((err) => console.error(err));
