import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any = null;

  constructor() {

  }

  connect(): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io.connect('http://localhost:3000/', {
        transports: ['websocket'], // Indicar que use WebSockets
        upgrade: false, // Evitar actualizaciones automáticas a WebSocket
        reconnectionAttempts: 5,
        reconnectionDelay: 2000
      });

      this.socket.on('connect', () => {
        console.log('Connected to the socket server');
        return
      });

      this.socket.on('connect_error', (error: any) => {
        console.error('Connection error:', error);
      });

      this.socket.on('disconnect', (reason: any) => {
        console.log('Disconnected from the socket server:', reason);
        this.socket = null; // Reset socket
      });
    }
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket?.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
