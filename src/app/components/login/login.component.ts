import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service'; // הוספנו את זה
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private errorService = inject(ErrorService); // הזרקה חסרה

  isLoading = false; // משתנה חסר

  // הגדרת הטופס
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    // בודקים שהטופס תקין
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // שולפים את הערכים מתוך הטופס
      const { email, password } = this.loginForm.value;

      // מוודאים שהם לא null
      if (email && password) {
        this.authService.login(email, password).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/teams']);
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this.errorService.show('שגיאה בהתחברות, בדוק את הפרטים');
          }
        });
      }
    } else {
      // אם הטופס לא תקין, אפשר להציג שגיאה או לסמן את השדות
      this.loginForm.markAllAsTouched();
    }
  }
}
