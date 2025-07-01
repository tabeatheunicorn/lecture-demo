import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjectsOverview } from "./objects-feature/objects-overview/objects-overview";
import { GenericObjectAdd } from "./objects-feature/generic-object-add/generic-object-add";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ObjectsOverview, GenericObjectAdd],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'lecture-app';
}
