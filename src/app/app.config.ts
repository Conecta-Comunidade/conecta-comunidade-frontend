import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    MessageService,
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: 'light',
        },
      },
    }),
  ],
};
