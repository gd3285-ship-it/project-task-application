import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { ProjectsService } from '../../services/projects.service';
import { Task, Comment, Project, PriorityLabels } from '../../models/models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);
  private projectsService = inject(ProjectsService);

  tasks = signal<Task[]>([]);
  projects = signal<Project[]>([]);
  projectId = signal<string | null>(null);
  teamId = signal<string | null>(null);
  isLoading = signal(false);
  showForm = signal(false);

  currentComments = signal<Comment[]>([]); 
  // תיקון: מרשים לקבל גם מספר
  activeTaskId = signal<string | number | null>(null);
  commentsCount = computed(() => this.currentComments().length);

  newTask = { title: '', description: '', priority: 'normal' as 'low' | 'normal' | 'high', dueDate: '' };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('projectId');
    if (id) {
      this.projectId.set(id);
      this.loadData(id);
    }
  }

  loadData(projectId: string) {
    this.isLoading.set(true);
    
    this.tasksService.getTasksByProject(projectId).subscribe({
      next: (t) => {
        this.tasks.set(t);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });

    this.projectsService.getAllProjects().subscribe({
      next: (projs) => {
        this.projects.set(projs);
        // המרה בטוחה להשוואה
        const current = projs.find(p => p.id == projectId);
        if (current && current.team_id) {
            this.teamId.set(current.team_id.toString());
        }
      }
    });
  }

  addTask() {
    const pId = this.projectId();
    if (!pId || !this.newTask.title.trim()) return;

    const taskToSend: Partial<Task> = {
      projectId: pId,
      title: this.newTask.title.trim(),
      description: this.newTask.description,
      status: 'todo',
      priority: this.newTask.priority,
    };
    if (this.newTask.dueDate) taskToSend.dueDate = this.newTask.dueDate;

    this.tasksService.createTask(taskToSend).subscribe({
      next: (res) => {
        this.tasks.update(prev => [...prev, res]);
        this.showForm.set(false);
        this.newTask = { title: '', description: '', priority: 'normal', dueDate: '' };
      }
    });
  }

  // תיקון: מקבל string | number
  changeStatus(taskId: string | number, newStatus: string) {
    const status = newStatus as 'todo' | 'in_progress' | 'done';
    
    this.tasks.update(all => all.map(t => t.id === taskId ? { ...t, status } : t));
    
    // המרה ל-string בשביל הסרביס
    this.tasksService.updateTask(taskId.toString(), { status }).subscribe();
  }

  // תיקון: מקבל string | number
  removeTask(taskId: string | number) {
    if (confirm('למחוק?')) {
      // המרה ל-string בשביל הסרביס
      this.tasksService.deleteTask(taskId.toString()).subscribe({
        next: () => this.tasks.update(all => all.filter(t => t.id !== taskId))
      });
    }
  }

  // תיקון: מקבל string | number
  toggleComments(taskId: string | number) {
    if (this.activeTaskId() === taskId) {
      this.activeTaskId.set(null);
    } else {
      this.activeTaskId.set(taskId);
      // המרה ל-string בשביל הסרביס
      this.tasksService.getComments(taskId.toString()).subscribe({
        next: (data) => this.currentComments.set(data),
        error: () => this.currentComments.set([])
      });
    }
  }

  // תיקון: מקבל string | number
  addComment(taskId: string | number, text: string) {
    if (!text.trim()) return;
    // המרה ל-string בשביל הסרביס
    this.tasksService.addComment(taskId.toString(), text).subscribe({
      next: (newComment) => this.currentComments.update(prev => [...prev, newComment])
    });
  }

  getProjectName(): string {
    const id = this.projectId();
    // השוואה גמישה (==) כי id יכול להיות מספר או מחרוזת
    const project = this.projects().find(p => p.id == id);
    return project?.name || 'לוח משימות';
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks().filter(task => task.status === status);
  }

  getPriorityLabel(priority: string): string {
    const labels: any = { 'low': 'נמוכה', 'normal': 'רגילה', 'high': 'גבוהה' };
    return labels[priority] || priority;
  }
}
