import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Team } from '../models/models';

@Injectable({
  providedIn: 'root'
})
// שימי לב: אנחנו יורשים מ-BaseService
export class TeamsService extends BaseService {
  private http = inject(HttpClient);
  
  // מגדירים את הכתובת הספציפית לצוותים
  private teamsUrl = `${this.apiUrl}/teams`;

  // קבלת כל הצוותים
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl);
  }

  // יצירת צוות חדש
  createTeam(name: string, description: string = ''): Observable<Team> {
    return this.http.post<Team>(this.teamsUrl, { name, description });
  }

  // הוספת חבר לצוות
  // שינינו את teamId ל-string כדי שיתאים למסד הנתונים שלך
  addMemberToTeam(teamId: string, email: string): Observable<any> {
    return this.http.post(`${this.teamsUrl}/${teamId}/members`, { email });
  }
}