
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // בדיקה אם המשתמש מחובר
  isAuthenticated = computed(() => !!this.authService.currentUserSig());
  
  // התיקון כאן: שינינו מ-username ל-name
  userName = computed(() => this.authService.currentUserSig()?.name || 'משתמש');

  showUserMenu = false;

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showUserMenu = false;
  }

  isActiveSection(section: string): boolean {
    const url = this.router.url;
    return url.includes(section);
  }
}