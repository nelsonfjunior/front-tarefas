import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask'

const maskConfigFunction: () => Partial<NgxMaskConfig> = () => {
  return {
    validation: false,
  };
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    provideEnvironmentNgxMask(maskConfigFunction),
    {provide: LOCALE_ID, useValue: 'pt-br'},
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
};

