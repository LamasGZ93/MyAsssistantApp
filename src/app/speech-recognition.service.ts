import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private recognitionAvailable = false;
  private transcriptSubject = new Subject<string>();

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    // Verificar si la API SpeechRecognition está disponible
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-ES';  // Configura el idioma de reconocimiento
      this.recognition.interimResults = true;  // Permite ver resultados intermedios mientras se habla
      this.recognition.continuous = true;  // Mantiene el reconocimiento activo hasta que se detenga manualmente

      // Configurar el evento onresult para manejar la transcripción
      this.recognition.onresult = (event: any) => {
        const currentTranscript = event.results[0][0].transcript;
        this.transcriptSubject.next(currentTranscript);  // Emitir el texto transcrito
      };

      // Evitar que se detenga automáticamente por inactividad
      this.recognition.onend = () => {
        if (this.recognition && this.recognition.state !== 'inactive') {
          // No hacemos nada aquí para evitar que se detenga automáticamente
        }
      };

      // Manejo de errores
      this.recognition.onerror = (event: any) => {
        console.error('Error de reconocimiento de voz: ', event.error);
      };

      this.recognitionAvailable = true;  // La API está disponible
    } else {
      console.error('SpeechRecognition no es soportado en este navegador.');
    }
  }

  // Iniciar el reconocimiento de voz
  startRecognition() {
    if (this.recognitionAvailable) {
      // Limpiar cualquier valor anterior antes de comenzar una nueva grabación
      this.transcriptSubject.next('');  // Limpiamos la transcripción anterior

      this.recognition.start();
    } else {
      console.error('Reconocimiento de voz no disponible');
    }
  }

  // Detener el reconocimiento de voz
  stopRecognition() {
    if (this.recognitionAvailable) {
      this.recognition.stop();
    }
  }

  // Obtener el texto transcrito (observable)
  getTranscribedText() {
    return this.transcriptSubject.asObservable();
  }
}
