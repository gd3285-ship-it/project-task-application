import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // הוספנו Router
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { TeamsService } from '../../services/teams.service';
import { Project, Team } from '../../models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // הזרקה של הראוטר
  private projectsService = inject(ProjectsService);
  private teamsService = inject(TeamsService);
  private fb = inject(FormBuilder);

  projects = signal<Project[]>([]);
  teams = signal<Team[]>([]);
  currentTeamId = signal<string | null>(null);
  isLoading = signal(false);
  showAddForm = signal(false);

  projectForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    if (teamId) {
      this.currentTeamId.set(teamId);
      this.loadProjects(teamId);
    }
    this.loadTeams();
  }

  loadProjects(teamId: string) {
    this.isLoading.set(true);
    this.projectsService.getProjectsByTeam(teamId).subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadTeams() {
    this.teamsService.getTeams().subscribe({
      next: (t) => this.teams.set(t)
    });
  }

  addProject() {
    const tid = this.currentTeamId();
    if (this.projectForm.valid && tid) {
      const { name, description } = this.projectForm.value;
      this.projectsService.createProject(tid, name!, description || '').subscribe({
        next: (newProject) => {
          this.projects.update(prev => [...prev, newProject]);
          this.projectForm.reset();
          this.showAddForm.set(false);
        }
      });
    }
  }

  // זו הפונקציה שהייתה חסרה!
  goToTasks(projectId: string) {
    this.router.navigate(['/tasks', projectId]);
  }

  getSelectedTeamName(): string {
    const id = this.currentTeamId();
    // תיקון: שימוש ב-id במקום _id
    const team = this.teams().find(t => t.id == id);
    return team?.name || '';
  }
}
