import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from 'src/app/shared/providers/constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { WebSocketService } from 'src/app/shared/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public userMessage: string = '';
  public userId: any;
  public name: any = '';
  private handleSocketErrorSub: Subscription | undefined;

  chatMessages: { sender?: string; message: string; reciver?: string }[] = [];
  constructor(
    private socketService: WebSocketService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {}

  async ngOnInit() {
    this.name = (await this.localStorage.getDataFromIndexedDB('name')) || '';
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    await this.receiveMessage();
  }

  receiveMessage = async () => {
    this.handleSocketErrorSub = this.socketService
      .listen('emitReceiveUserMessage')
      .subscribe({
        next: (newMessage: any) => {
          this.chatMessages.push({
            sender: newMessage.name,
            message: newMessage.message,
          });
        },
        error: (error) => {
          console.error('Socket error:', error);
        },
        complete: () => {
          console.log('Subscription completed.');
        },
      });
  };

  async sendMessage() {
    if (this.userMessage.trim()) {
      const data = {
        message: this.userMessage,
        userId: this.userId,
        name: this.name,
      };
      console.log(data);

      await this.socketService.emit('emitNewUserMessage', data);
      // User message
      this.chatMessages.push({ reciver: this.name, message: this.userMessage });

      // Clear input field
      this.userMessage = '';
    }
  }
}
