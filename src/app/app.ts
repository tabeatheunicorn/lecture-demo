import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjectsOverview } from "./objects-feature/objects-overview/objects-overview";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ObjectsOverview],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'lecture-app';
}
