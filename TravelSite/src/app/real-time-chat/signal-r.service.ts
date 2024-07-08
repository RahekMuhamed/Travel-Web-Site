import { Injectable } from '@angular/core';
import signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/api/Chat') // Replace with your server URL
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public addReceiveMessageListener(): void {
    this.hubConnection.on('ReceiveMessageFromCustomer', (data) => {
      console.log('Message received from customer: ', data);
      // Handle the received message
    });
  }

  public sendMessageToClient(
    message: string,
    receiverId: string,
    senderId: string
  ): void {
    this.hubConnection
      .invoke('SendMessageToClient', message, receiverId, senderId)
      .catch((err) => console.error('Error while sending message: ' + err));
  }
}