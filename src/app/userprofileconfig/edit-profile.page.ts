import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService  // Inyectamos el AuthService

  ) {
    this.profileForm = this.fb.group({
      name: [localStorage.getItem('userName') || 'Usuario', Validators.required],
      email: [localStorage.getItem('userEmail'), [Validators.required, Validators.email]],
      timezone: ['Europe/Madrid', Validators.required],
      interactionStyle: ['breve', Validators.required]
    });
  }

  async saveProfile() {
    if (this.profileForm.valid) {
      const newName = this.profileForm.value.name;

      // Actualizamos el nombre usando AuthService
      this.authService.setUserName(newName);

      console.log('Datos guardados:', this.profileForm.value);

      // Mostrar toast de éxito
      const toast = await this.toastController.create({
        message: 'Preferencias actualizadas correctamente',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();

      // Redirigir al perfil
      this.router.navigate(['/user']);
    }
  }

  cancel() {
    this.router.navigate(['/user']);
  }
}
