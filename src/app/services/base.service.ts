import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected apiUrl = 'http://localhost:3000/api';
}