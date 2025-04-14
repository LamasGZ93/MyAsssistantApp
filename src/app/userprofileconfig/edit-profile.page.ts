import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage {
  profileForm: FormGroup;

  // 🔊 Propiedades para toggles
  notificationsEnabled: boolean = true;
  assistantSounds: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {
    // Crear formulario con todos los campos necesarios
    this.profileForm = this.fb.group({
      name: [localStorage.getItem('userName') || 'Usuario', Validators.required],
      email: [localStorage.getItem('userEmail'), [Validators.required, Validators.email]],
      timezone: ['Europe/Madrid', Validators.required],
      interactionStyle: ['breve', Validators.required],
      notificationsEnabled: [localStorage.getItem('notificationsEnabled') === 'false' ? false : true],
      assistantSounds: [localStorage.getItem('assistantSounds') === 'false' ? false : true]
    });
  }

  async saveProfile() {
    if (this.profileForm.valid) {
      const newName = this.profileForm.value.name;

      // Guardar el nombre de usuario en AuthService
      this.authService.setUserName(newName);

      // Guardar preferencias en localStorage
      localStorage.setItem('notificationsEnabled', String(this.profileForm.value.notificationsEnabled));
      localStorage.setItem('assistantSounds', String(this.profileForm.value.assistantSounds));

      console.log('Datos guardados:', this.profileForm.value);

      // Mostrar toast de éxito
      const toast = await this.toastController.create({
        message: 'Preferencias actualizadas correctamente',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();

      this.router.navigate(['/user']);
    }
  }

  cancel() {
    this.router.navigate(['/user']);
  }
}
