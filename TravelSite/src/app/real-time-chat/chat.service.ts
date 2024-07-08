import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/api/Chats'; // Adjust the base URL as needed
  // router = inject(Router);
  // chatService = inject(ChatService);
  public messages$ = new BehaviorSubject<any>([]);
  public activeUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];
  constructor(private http: HttpClient) {
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
    .withUrl('http://localhost:7062/Chat')

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

  //###############################################
  getChats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetChats`);
  }
  getChatById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetChat/${id}`);
  }
   getChatByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetChatByName/${name}`);
  }

  addChat(chat: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddChat`, chat);
  }

  deleteChat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteChat/${id}`);
  }

  sendMessageToClient(message: string, receiverId: string, senderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/SendMessageToClient`, { message, receiverId, senderId });
  }

  sendMessageToCustomerService(message: string, receiverId: string, senderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/SendMessageToCustomerService`, { message, receiverId, senderId });
  }

  sendMessageToAll(userId: string, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/SendMessageToAll`, { userId, message });
  }

  notifyUser(userId: string, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/NotifyUser`, { userId, message });
  }

  joinGroup1(conn: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/JoinGroup`, conn);
  }

  sendMessageToGroup(groupName: string, message: string, senderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/SendMessageToGroup`, { groupName, message, senderId });
  }

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllMessages`);
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteMessage/${messageId}`);
  }

  markMessageAsRead(messageId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/MarkMessageAsRead/${messageId}`, null);
  }

  updateUserStatus(userId: number, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/UpdateUserStatus`, { userId, status });
  }

  notifyTyping(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/NotifyTyping/${userId}`);
  }

}
