import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // router = inject(Router);
  // chatService = inject(ChatService);
  public messages$ = new BehaviorSubject<any>([]);
  public activeUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];
  constructor() {
    // Start the `SignalR` connection when the service is instantiated
    this.start();

    // Subscribe to the "ReceiveMessage" hub event
    this.connection.on(
      'ReceiveMessage',
      (user: string, message: string, messageTime: string) => {
        // Update the local messages array with the received message and notify subscribers
        this.messages = [...this.messages, { user, message, messageTime }];
        this.messages$.next(this.messages);
      }
    );

    // Subscribe to the "ConnectedUser" hub event
    this.connection.on('ConnectedUser', (users: any) => {
      // Log the connected users to the console
      console.log('Connected Users:', users);

      // Update the local users array and notify subscribers
      this.activeUsers$.next(users);
    });
  }
  // Create a `SignalR` HubConnection and configure it
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    // Specify the URL of the `SignalR` hub
    .withUrl('http://localhost:7062/chat')

    // Configure the logging level for `SignalR` (optional)
    .configureLogging(signalR.LogLevel.Information)

    // Build the HubConnection instance
    .build();

  public async start() {
    try {
      // Attempt to start the `SignalR` connection
      await this.connection.start();

      // If successful, log a message indicating the connection is established
      console.log('Connection is established');
    } catch (error) {
      // If an error occurs during connection startup
      console.error('Error during connection startup:', error);
    }
  }

  public async joinGroup(user: string, chatGroup: string) {
    // Use the `SignalR` connection to invoke the "JoinGroup" method on the server
    // The method takes an object with user and chatGroup parameters
    return this.connection.invoke('JoinGroup', { user, chatGroup });
  }
  public async SendChatMessage(message: string) {
    // Use the `SignalR` connection to invoke the "SendChatMessage" method on the server
    // The method takes a message parameter
    return this.connection.invoke('SendChatMessage', message);
  }
  public async leaveChat() {
    // Stop the `SignalR` connection to leave the chat
    this.connection.stop();
  }
}
