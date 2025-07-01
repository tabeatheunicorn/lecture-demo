import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideKeycloak, includeBearerTokenInterceptor, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, createInterceptorCondition } from 'keycloak-angular';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

const urlCondition = createInterceptorCondition({
  urlPattern: /^(https?:\/\/lecture-api\.gruppe\.ai)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
   ...(environment.keycloakConfig
      ? [
          provideKeycloak({
            config: {
              url: environment.keycloakConfig.url,
              realm: environment.keycloakConfig.realm,
              clientId: environment.keycloakConfig.clientId,
            },
            initOptions: {
              onLoad: 'login-required',
              silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            },
          }),
          {
            provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
            useValue: [urlCondition],
          },
        ]
      : []),
  ]
};
