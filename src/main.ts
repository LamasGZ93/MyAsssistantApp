import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Importar los iconos de Ionicons
import { addIcons } from 'ionicons';
import { settings, settingsSharp, mic, person, home, stopCircleSharp, logOutSharp, calendarNumberSharp, micSharp, key, textSharp, lockClosedSharp } from 'ionicons/icons';

// Registrar los iconos que vas a usar
addIcons({
  'settings': settings,
  'settings-sharp': settingsSharp,
  'stop-circle-sharp': stopCircleSharp,
  'mic': mic,
  'person': person,
  'home': home,
  'log-out-sharp': logOutSharp,
  'calendar-number-sharp': calendarNumberSharp,
  'mic-sharp' : micSharp,
  'text-sharp' : textSharp, 
  'lock-closed-sharp' : lockClosedSharp,
  'mic-circle-sharp' : micSharp,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

