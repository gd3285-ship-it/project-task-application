import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
// שימי לב: אנחנו מייבאים את המודלים מהקובץ המאוחד שיצרנו
import { AuthResponse, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // כתובת השרת
  private apiUrl = 'http://localhost:3000/api/auth';

  // Signal שמחזיק את המשתמש המחובר (כדי שה-Header יוכל להציג את השם)
  currentUserSig = signal<User | null>(null);

  constructor() {
    // בודק אם יש מידע שמור בדפדפן (כדי שלא נתנתק כשמרעננים את הדף)
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        this.currentUserSig.set(JSON.parse(user));
      } catch (e) {
        console.error('Error parsing user data');
      }
    }
  }

  // הרשמה
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap(res => {
        this.saveData(res);
      })
    );
  }

  // התחברות
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        this.saveData(res);
      })
    );
  }

  // התנתקות
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSig.set(null);
    this.router.navigate(['/login']);
  }

  // פונקציית עזר לשמירת הנתונים בדפדפן
  private saveData(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.currentUserSig.set(res.user);
  }

  // פונקציה לקבלת הטוקן (עבור ה-Interceptor)
  getToken() {
    return localStorage.getItem('token');
  }
}