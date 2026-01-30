import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Task, Comment } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseService {
  private http = inject(HttpClient);
  private tasksUrl = `${this.apiUrl}/tasks`;
  private commentsUrl = `${this.apiUrl}/comments`;

  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}?projectId=${projectId}`);
  }

  createTask(taskData: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, taskData);
  }

  updateTask(taskId: string, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.tasksUrl}/${taskId}`, updates);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`);
  }

  getComments(taskId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsUrl}?taskId=${taskId}`);
  }

  addComment(taskId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, { taskId, body: text });
  }
}