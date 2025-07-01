import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiObject } from './object.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = `https://${environment.serverURL}`;
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly listResponseState = signal<
    { status: 'success'; data: ApiObject[] } |
    { status: 'error'; error: string }
  >({ status: 'success', data: [] });

  readonly objectsRequestState = this.listResponseState.asReadonly();

  constructor() {
    // Poll every 5 seconds and update the response state
    interval(5000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.getObjects()))
      .subscribe({
        next: (objects) => {
          this.listResponseState.set({ status: 'success', data: objects });
        },
        error: (err) => {
          console.error('Error fetching objects:', err);
          this.listResponseState.set({ status: 'error', error: err });
        },
      });
  }

  getObjects(): Observable<ApiObject[]> {
    return this.http.get<ApiObject[]>(`${this.baseUrl}/object_list`);
  }

  addObject(newObject: Record<string, any>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add_object`, newObject);
  }
}
