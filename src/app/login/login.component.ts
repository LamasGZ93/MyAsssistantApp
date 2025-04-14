import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  // Usamos @ViewChild para referirnos al botón de Google
  @ViewChild('googleButton') googleButton?: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getters para facilitar el acceso a los campos en el HTML
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        console.log('✅ Login exitoso, redirigiendo al UserPage');
        this.router.navigate(['/user']);
      } else {
        console.log('❌ Login fallido');
      }
    } else {
      console.log('⚠️ Formulario inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  // Método para login con Google
  loginWithGoogle() {
    this.authService.loginWithGoogle().then((isLoggedIn) => {
      if (isLoggedIn) {
        console.log('✅ Login exitoso con Google, redirigiendo al UserPage');
        this.router.navigate(['/user']);
      } else {
        console.log('❌ Login fallido con Google');
      }
    });
  }

  // Métodos para manejar el hover sobre el botón de Google
  onMouseOver() {
    if (this.googleButton) {
      const button = this.googleButton.nativeElement;
      button.style.transform = 'scale(1.2)';
      button.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2)';
    }
  }

  onMouseOut() {
    if (this.googleButton) {
      const button = this.googleButton.nativeElement;
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
  }
}
