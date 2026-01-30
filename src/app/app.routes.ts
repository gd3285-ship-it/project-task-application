import { Routes, Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';

// --- הגדרת ה-Guard ישירות כאן כדי למנוע שגיאות ייבוא ---
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    return true;
  } 
  
  router.navigate(['/login']);
  return false;
};
// -------------------------------------------------------

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // שימוש ב-Guard שהגדרנו למעלה
  { path: 'teams', component: TeamsComponent, canActivate: [authGuard] },
  { path: 'projects/:teamId', component: ProjectsComponent, canActivate: [authGuard] },
  { path: 'tasks/:projectId', component: TasksComponent, canActivate: [authGuard] },
  
  { path: '**', component: NotFoundComponent }
];