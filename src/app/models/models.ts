// src/app/models/models.ts

export interface User {
  id: number | string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Team {
  id: number | string; // הוספנו את זה כדי לפתור את השגיאה ב-HTML
  name: string;
  created_at?: string;
  members_count?: number;
  members?: any[];
}

export interface Project {
  id: number | string;
  name: string;
  description: string;
  team_id?: number | string;
  teamId?: number | string;
}

export interface Task {
  id?: number | string;
  projectId: number | string;
  title: string;
  description?: string;
  // שימי לב: אותיות קטנות בדיוק כמו בקוד של הקומפוננטה
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'normal' | 'high';
  dueDate?: string;
  created_at?: string;
}

export interface Comment {
  id: number | string;
  taskId: number | string;
  body: string;
  created_at: string;
  author_name?: string;
}

export interface PriorityLabels {
  [key: string]: string;
}