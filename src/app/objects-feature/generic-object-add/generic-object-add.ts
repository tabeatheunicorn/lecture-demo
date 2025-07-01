import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
interface GenericObject {
  [key: string]: any;
}

@Component({
  selector: 'app-generic-object-add',
  imports: [FormsModule, JsonPipe],
  templateUrl: './generic-object-add.html',
  styleUrl: './generic-object-add.scss'
})
export class GenericObjectAdd {
  private readonly objectsService = inject(ApiService);
  jsonText = signal<string>('{}');

  model = signal<GenericObject>({});

  parseJson() {
    try {
      const parsed = JSON.parse(this.jsonText());
      this.model.set(parsed);
    } catch (e) {
      console.error('Invalid JSON', e);
      this.model.set({});
    }
  }

  addObject(){
    this.objectsService.addObject(this.model())
      .subscribe({
        next: () => {
          console.log('Object added successfully');
          this.model.set({}); // Reset the model after successful addition
          this.jsonText.set('{}'); // Reset the JSON text input
        },
        error: (err) => {
          console.error('Error adding object:', err);
        }
      })
  }
}
