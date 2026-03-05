import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { IconsPreloaderService, UiModule } from '@chortex/ui-kit-lib';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(UiModule), IconsPreloaderService],
};
