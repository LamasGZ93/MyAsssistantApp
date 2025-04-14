import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpeechRecognitionService } from '../speech-recognition.service';  // Importamos el servicio
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class UserPage {
  userName: string = '';
  private userNameSubscription: Subscription;

  isVoiceInput: boolean = false;
  isRecording: boolean = false;
  isDragging: boolean = false;
  isLocked: boolean = false;
  transcribedText: string = '';
  userInput: string = '';
  isStopVisible: boolean = false;

  pendingTasks: string[] = ['Secar la ropa', 'Comprar pan', 'Llamar a mamá'];
  completedTasks: string[] = ['Estudiar Angular', 'Hacer ejercicio'];

  startY: number = 0;
  dragThreshold: number = 50;
  buttonPosition: { top: string; left: string } = { top: '50px', left: '50px' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private speechRecognitionService: SpeechRecognitionService,  // Inyectamos el servicio
    private alertController: AlertController
  ) {
    this.userNameSubscription = this.authService.getUserName().subscribe(name => {
      this.userName = name;
    });

    // Suscripción al texto transcrito desde el servicio de reconocimiento de voz
    this.speechRecognitionService.getTranscribedText().subscribe(text => {
      this.transcribedText = text;  // Actualizamos el texto transcrito
    });
  }

  toggleInputMode(mode: 'voice' | 'text') {
    // No activamos el micrófono inmediatamente al cambiar el modo de entrada
    this.isVoiceInput = mode === 'voice';
    if (!this.isVoiceInput) {
      this.stopVoiceRecognition();  // Detenemos el reconocimiento de voz si se cambia al modo texto
    }
    // El reconocimiento solo se activará al presionar el botón de grabar
  }

  startDrag(event: any) {
    if (!this.isLocked) {
      this.isDragging = true;
      this.startY = event.clientY || event.touches[0].clientY;
      this.buttonPosition = { top: `${event.clientY}px`, left: `${event.clientX}px` };
    }
  }

  moveDrag(event: any) {
    if (this.isDragging && !this.isLocked) {
      const currentY = event.clientY || event.touches[0].clientY;
      const distance = this.startY - currentY;

      if (distance >= this.dragThreshold) {
        this.isLocked = true;
        this.startRecording();
        this.isStopVisible = true;
      }

      if (this.isLocked) {
        this.buttonPosition = { top: `${Math.max(50, currentY - 50)}px`, left: `${event.clientX}px` };
      }
    }
  }

  stopDrag() {
    if (!this.isLocked) {
      this.isDragging = false;
      this.buttonPosition = { top: '50px', left: '50px' };
    }
  }

  startRecording() {
    this.isRecording = true;
    this.transcribedText = '';  // Limpiar el texto anterior antes de iniciar la grabación
    this.startVoiceRecognition();  // Iniciamos el reconocimiento de voz solo cuando se presiona el botón de grabar
  }

  stopRecording() {
    this.isRecording = false;
    this.isLocked = false;
    this.isStopVisible = false;
    this.buttonPosition = { top: '50px', left: '50px' };
    this.stopVoiceRecognition();  // Detenemos el reconocimiento de voz cuando se presiona el botón de detener
  }

  

  startVoiceRecognition() {
    this.speechRecognitionService.startRecognition();  // Iniciamos el reconocimiento de voz solo cuando el botón de grabar es presionado
  }

  stopVoiceRecognition() {
    this.speechRecognitionService.stopRecognition();  // Detenemos el reconocimiento de voz
  }
   

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  ngOnDestroy() {
    if (this.userNameSubscription) {
      this.userNameSubscription.unsubscribe();
    }
  }
}
