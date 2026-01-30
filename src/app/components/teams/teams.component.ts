import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TeamsService } from '../../services/teams.service';
import { ErrorService } from '../../services/error.service';
import { Team } from '../../models/models';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  private teamsService = inject(TeamsService);
  private errorService = inject(ErrorService);

  teams = signal<Team[]>([]);
  isLoading = signal<boolean>(false);

  // מודאלים
  showAddForm = signal(false);
  // שינינו ל-string כי ה-ID של הצוות הוא string
  showAddMemberForm = signal<string | null>(null);

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.isLoading.set(true);
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        this.teams.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  addTeam(name: string) {
    if (!name) return;
    this.teamsService.createTeam(name).subscribe({
      next: (newTeam) => {
        this.teams.update(prev => [...prev, newTeam]);
        this.showAddForm.set(false);
      }
    });
  }

  // הוספת חבר לצוות (מותאם לשרת שלך)
  addMemberToTeam(teamId: string, emailOrId: string) {
    if (!emailOrId) {
      this.errorService.show('נא להזין אימייל או ID');
      return;
    }

    // מחקנו את parseInt - אנחנו שולחים את המחרוזת כמו שהיא
    this.teamsService.addMemberToTeam(teamId, emailOrId).subscribe({
      next: () => {
        this.errorService.show('חבר נוסף בהצלחה!'); // הודעה ירוקה (אופציונלי)
        this.loadTeams(); // רענון כדי לראות את מספר החברים גדל
        this.showAddMemberForm.set(null);
      },
      error: (err) => {
        console.error(err);
        this.errorService.show('שגיאה בהוספת חבר. ודאי שהמשתמש קיים.');
      }
    });
  }
}