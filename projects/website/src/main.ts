import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { API_BASE_URL } from 'api-client';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  {
    provide: API_BASE_URL,
    useValue: environment.apiEndpoint
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
