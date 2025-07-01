import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RandomWsService } from './random-ws.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-random-ws',
  templateUrl: './random-ws.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomWsComponent {
   readonly mean = signal(0);
   readonly std = signal(1);
   readonly interval = signal(1000);

  private readonly randomWsService = inject(RandomWsService);

  readonly data = this.randomWsService.wsData;
  connect(): void {
    this.randomWsService.connect(this.mean(), this.std(), this.interval());
  }

  disconnect(): void {
    this.randomWsService.disconnect();
  }
}
