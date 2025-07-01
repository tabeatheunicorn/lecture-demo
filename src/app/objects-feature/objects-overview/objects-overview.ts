import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-objects-overview',
  imports: [JsonPipe, CommonModule],
  templateUrl: './objects-overview.html',
})
export class ObjectsOverview {
  private readonly objectService = inject(ApiService);
  readonly responseState = this.objectService.objectsRequestState;
}
