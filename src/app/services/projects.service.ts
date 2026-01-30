import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Project } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService {
  private http = inject(HttpClient);
  // שימי לב לכתובת:
  private projectsUrl = `${this.apiUrl}/projects`;

  // זו הפונקציה שהייתה חסרה וגרמה לשגיאות ב-Tasks
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getProjectsByTeam(teamId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectsUrl}?teamId=${teamId}`);
  }

  createProject(teamId: string, name: string, description: string): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, { teamId, name, description });
  }
}