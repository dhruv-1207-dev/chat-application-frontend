import { LOCAL_STORAGE_KEYS } from '../../global/constant';
import { LocalStorageService } from '../services/local-storage.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: any;

  constructor(private localStorage: LocalStorageService) {
    const token = this.localStorage.getLocalStore(LOCAL_STORAGE_KEYS.TOKEN);

    this.socket = io.connect(`${environment.CHAT_URL}${token}`, {
      reconnection: true,
      reconnectionAttempts: 10,
    });

    // Ensure the socket connection is established before proceeding
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);
    });
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: unknown) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  stopListen(eventName: string) {
    this.socket.removeAllListeners(eventName);
  }

  waitForSocketConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.connected) {
        resolve();
      } else {
        this.socket?.once('connect', () => {
          resolve();
        });

        this.socket?.once('connect_error', (error: any) => {
          reject(error);
        });
      }
    });
  }
}
