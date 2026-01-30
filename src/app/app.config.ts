import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { apiInterceptor } from './api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // <--- הפסיק הזה היה חסר כנראה
    provideRouter(routes), // <--- וגם זה
    provideHttpClient(withInterceptors([apiInterceptor]))
  ]
};