import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],  // Campo nombre
      email: ['', [Validators.required, Validators.email]],  // Campo email
      password: ['', [Validators.required, Validators.minLength(6)]],  // Contraseña con validación de longitud mínima
    });
  }

  // Getters para acceder a los campos en la plantilla de manera más limpia
  get name() {
    return this.registerForm.get('name')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  register() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      console.log('Nombre:', name);
      console.log('Email:', email);
      console.log('Password:', password);

      // Llamada al servicio de autenticación
      const isRegistered = this.authService.register(email, password);  // Suponemos que el método register ya está implementado en AuthService

      if (isRegistered) {
        console.log('✅ Registro exitoso, redirigiendo al UserPage');
        this.router.navigate(['/user']);  // Redirige al usuario
      } else {
        console.log('❌ Registro fallido');
      }
    } else {
      console.log('⚠️ Formulario inválido');
      this.registerForm.markAllAsTouched();  // Muestra errores si el formulario está incompleto
    }
  }
}





