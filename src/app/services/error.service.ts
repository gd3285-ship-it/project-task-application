import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  // Signal שמחזיק את הודעת השגיאה הנוכחית
  message = signal<string | null>(null);

  // פונקציה להצגת שגיאה
  show(msg: string) {
    this.message.set(msg);
    // אופציונלי: להעלים את השגיאה אוטומטית אחרי 3 שניות
    setTimeout(() => this.clear(), 5000);
  }

  // פונקציה לניקוי השגיאה
  clear() {
    this.message.set(null);
  }
}