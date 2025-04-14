import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Solo necesitas IonicModule aquí

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule] // Asegúrate de importar solo IonicModule
})
export class HomePage {
  constructor(private router: Router) {}

  // Redirigir a la página de inicio de sesión
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
