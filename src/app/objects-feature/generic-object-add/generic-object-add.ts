import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
}
