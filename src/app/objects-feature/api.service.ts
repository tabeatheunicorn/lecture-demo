import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiObject } from './object.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = `https://${environment.serverURL}`;
  private readonly http = inject(HttpClient);

  private readonly apiObjects = signal<ApiObject[]>([]);
  readonly objects = this.apiObjects.asReadonly();

  constructor() {
    // Poll every 5 seconds and update the signal
    interval(5000)
      .pipe(switchMap(() => this.getObjects()))
      .subscribe({
        next: (objects) => {
          this.apiObjects.set(objects);
        },
        error: (err) => {
          console.error('Error fetching objects:', err);
        },
      });
  }

  getObjects(): Observable<ApiObject[]> {
    return this.http.get<ApiObject[]>(`${this.baseUrl}/object_list`);
  }
}
