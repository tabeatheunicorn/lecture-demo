import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-objects-overview',
  imports: [JsonPipe],
  templateUrl: './objects-overview.html',
})
export class ObjectsOverview {
  private readonly objectService = inject(ApiService);
  readonly objects = this.objectService.objects;
}
