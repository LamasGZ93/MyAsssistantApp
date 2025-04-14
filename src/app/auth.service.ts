import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'; 
import { initializeApp } from 'firebase/app'; 
import { firebaseConfig } from './firebase-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: any;
  private userNameSubject: BehaviorSubject<string>;

  constructor() {
    // Inicializa Firebase solo una vez en el constructor
    const app = initializeApp(firebaseConfig);  // Inicializa Firebase con la configuración
    this.auth = getAuth(app); // Usa la aplicación Firebase para obtener la instancia de autenticación

    // Inicializamos el BehaviorSubject con el nombre guardado en localStorage
    const storedName = localStorage.getItem('userName') || 'Usuario';
    this.userNameSubject = new BehaviorSubject<string>(storedName);
  }

  // Obtiene el nombre del usuario como un Observable
  getUserName() {
    return this.userNameSubject.asObservable();
  }

  // Establece el nuevo nombre del usuario y lo guarda en localStorage
  setUserName(newName: string) {
    localStorage.setItem('userName', newName);
    this.userNameSubject.next(newName);
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('userLoggedIn') === 'true';
  }

  // Login con email y contraseña
  login(email: string, password: string): boolean {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (storedEmail === email && storedPassword === password) {
      localStorage.setItem('userLoggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  // Registro con email y contraseña
  register(email: string, password: string): boolean {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userLoggedIn', 'true');
    return true;
  }

  // Login con Google
  loginWithGoogle(): Promise<boolean> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem('userEmail', user.email || '');
        localStorage.setItem('userLoggedIn', 'true');
        console.log('Login exitoso con Google:', user.email);
        return true;
      })
      .catch((error) => {
        // Manejo de errores
        if (error.code === 'auth/popup-closed-by-user') {
          console.log('El popup fue cerrado antes de completar la autenticación.');
        } else {
          console.error('Error en login con Google:', error);
        }
        return false;
      });
  }

  // Logout
  logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }
}

