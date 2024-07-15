import { Component } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,

  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ChatComponent } from '../chatComponent/chat/chat.component';
import { ChatInputComponent } from '../chatComponent/chat-input/chat-input.component';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '../message.interface';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-room',
    standalone: true,
    templateUrl: './room.component.html',
    styleUrl: './room.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ChatInputComponent, ChatComponent, PanelModule, HeaderComponent]
})
export class RoomComponent {
  myId = uuidv4();
  contactId = uuidv4();
  chatComponent = viewChild.required(ChatComponent);
  newMessage = signal<ChatMessage | null>(null);
  cdRef = inject(ChangeDetectorRef);
  newMessageChange = effect(
    () => {
      console.log('newMessage changed', this.newMessage());
      if (!this.newMessage()) {
        return;
      }
      this.messages.update((messages) => [...messages, this.newMessage()!]);
      this.cdRef.detectChanges();
      this.scrollChatToBottom();
      this.newMessage.set(null);
    },
    {
      allowSignalWrites: true,
    }
  );
  messages = signal<ChatMessage[]>([
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
  ]);

  constructor() {
    afterNextRender(() => {
      this.scrollChatToBottom();
    });
  }

  removeMessage(messageId: string) {
    this.messages.update((messages) =>
      messages.filter((msg) => msg.id !== messageId)
    );
  }

  scrollChatToBottom() {
    const el = this.chatComponent().scrollContainer as HTMLElement;
    el.scrollTo({
      top: el.scrollHeight,
    });
  }
}
