import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    MessageService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: 'light',
        },
      },
      translation: {
        firstDayOfWeek: 0,
        dayNames: [
          'domingo',
          'segunda-feira',
          'terça-feira',
          'quarta-feira',
          'quinta-feira',
          'sexta-feira',
          'sábado',
        ],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: [
          'janeiro',
          'fevereiro',
          'março',
          'abril',
          'maio',
          'junho',
          'julho',
          'agosto',
          'setembro',
          'outubro',
          'novembro',
          'dezembro',
        ],
        monthNamesShort: [
          'jan',
          'fev',
          'mar',
          'abr',
          'mai',
          'jun',
          'jul',
          'ago',
          'set',
          'out',
          'nov',
          'dez',
        ],
        today: 'Hoje',
        clear: 'Limpar',
      },
    }),
  ],
};
