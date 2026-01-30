import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// ודאי ששתי השורות האלו קיימות:
import { HeaderComponent } from './components/header/header.component';
import { ErrorBannerComponent } from './components/error-banner/error-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // ודאי שהם רשומים כאן ב-imports:
  imports: [RouterOutlet, HeaderComponent, ErrorBannerComponent],
  template: `
    <app-header></app-header>
    <app-error-banner></app-error-banner>
    
    <div style="padding-top: 64px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {} // או App