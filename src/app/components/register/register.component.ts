import { Component, inject } from '@angular/core'; // מחקנו את computed כי לא בשימוש
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private errorService = inject(ErrorService);

  name = '';
  email = '';
  password = '';
  isLoading = false;

  onSubmit() {
    if (this.name && this.email && this.password) {
      this.isLoading = true;
      
      this.authService.register(this.name, this.email, this.password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.errorService.show('ההרשמה נכשלה. נסה שנית מאוחר יותר.');
        }
      });
    }
  }
}