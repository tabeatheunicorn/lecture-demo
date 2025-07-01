import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiObject } from './object.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = `https://${environment.serverURL}`;
  private readonly http = inject(HttpClient);

  getObjects(): Observable<ApiObject[]> {
    return this.http.get<ApiObject[]>(`${this.baseUrl}/object_list`);
  }
}
