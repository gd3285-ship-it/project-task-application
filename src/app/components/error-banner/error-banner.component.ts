import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-banner.component.html', // הפניה לקובץ HTML
  styleUrl: './error-banner.component.scss'     // הפניה לקובץ SCSS
})
export class ErrorBannerComponent {
  private err = inject(ErrorService);
  message = computed(() => this.err.message());

  close() {
    this.err.clear();
  }
}
