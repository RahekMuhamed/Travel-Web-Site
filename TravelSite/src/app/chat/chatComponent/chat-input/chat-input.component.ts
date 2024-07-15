import { Component } from '@angular/core';
import { input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../message.interface';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
})
export class ChatInputComponent {
  value = model.required<ChatMessage | null>();
  myId = input.required<string>();
  inputVal = signal<string>('');

  sendMessage(message: string, $event: Event) {
    $event.preventDefault();
    this.value.set({
      text: message,
      id: uuidv4(),
      userId: this.myId(),
      createdAt: Date.now(),
    });
    this.inputVal.set('');
  }
}
