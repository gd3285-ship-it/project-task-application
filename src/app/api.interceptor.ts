import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service'; // <--- ודאי שהקובץ אכן קיים בתיקייה services ושמו auth.service.ts
import { ErrorService } from './services/error.service';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const errorService = inject(ErrorService);
  
  const token = authService.getToken();

  let cloned = req;
  
  if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(cloned).pipe(
    catchError((error) => {
      // טיפול בשגיאות רשת
      if (error.status === 0) {
        errorService.show('השרת לא זמין. ודאי ש-Node.js רץ.');
      } 
      else if (error.status === 401) {
        authService.logout(); // ניתוק במקרה של טוקן לא תקף
      }
      return throwError(() => error);
    })
  );
};