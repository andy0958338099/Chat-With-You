// Base model interfaces for MVVM architecture

export interface User {
  id: string;
  username: string;
  avatar?: string;
  email: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastActivity: Date;
  isAIChat: boolean;
  aiAssistantId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  name: string;
  size: number;
}

export interface AIAssistant {
  id: string;
  name: string;
  avatar?: string;
  description: string;
  capabilities: string[];
  creator: string;
  isPublic: boolean;
  price?: number;
  rating?: number;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: 'monthly' | 'yearly';
}
