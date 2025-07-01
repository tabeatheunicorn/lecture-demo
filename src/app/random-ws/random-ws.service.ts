import { Injectable, signal } from '@angular/core';
import { RandomValue } from './random-ws.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RandomWsService {
  private readonly _wsData = signal<RandomValue[]>([]);
  public readonly wsData = this._wsData.asReadonly();

  private websocket: WebSocket | null = null;

  connect(mean: number, std: number, interval: number): void {
    this.disconnect();
    const protocol = 'ws';
    const url = `${protocol}://${environment.serverURL}/ws?mean=${mean}&std=${std}&interval=${interval}`;

    this.websocket = new WebSocket(url);

    this.websocket.onmessage = (event) => {
      try {
        const data: RandomValue = JSON.parse(event.data);
        console.log('Received value:', data.value);
        this._wsData.update((current) => [...current, data]);
      } catch (err) {
        console.error('Error parsing WebSocket message', err);
      }
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    this.websocket.onclose = (event) => {
      console.log('WebSocket connection closed', event.reason);
      // Optionally reconnect:
      // setTimeout(() => this.connect(mean, std, interval), 3000);
    };
  }

  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }
}
