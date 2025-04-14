import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './auth.service';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  styleUrls: ['app.component.scss'],
  standalone: true,
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router, private authService: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const app = initializeApp(firebaseConfig);
      console.log('Firebase inicializado', app);

      const tutorialVisto = localStorage.getItem('tutorialVisto');
      
      if (tutorialVisto === 'true') {
        if (this.authService.isLoggedIn()) {
          this.router.navigateByUrl('/user', { replaceUrl: true });
        } else {
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      } else {
        this.router.navigateByUrl('/slide', { replaceUrl: true });
      }
    });
  }
}
