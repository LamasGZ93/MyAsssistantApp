import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { RegisterPage } from './register/register.component';
import { LoginPage } from './login/login.component';
import { SlidePage } from './pages/slide/slide.page';
import { UserPage } from './user/user.component'; // Asegúrate de que el componente UserPage esté bien importado
import { AuthGuard } from './auth.guard';  // Asegúrate de que AuthGuard esté importado

// Rutas
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',  // Redirige por defecto a la página home
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'slide',
    component: SlidePage,
  },
  {
    path: 'user',
    component: UserPage,  // Redirige a la página de usuario
    canActivate: [AuthGuard],  // Solo accesible si el usuario está logueado
  },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./userprofileconfig/edit-profile.page').then(m => m.EditProfilePage)
  }
  
];



