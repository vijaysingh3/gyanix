// Sabhi Chat related types yahan define hain

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  isError?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
  messageCount?: number;
}

export interface SendMessageRequest {
  message: string;
  chatId?: string;
  history?: Message[];
}

export interface SendMessageResponse {
  success: boolean;
  data?: {
    message: Message;
    chatId: string;
  };
  error?: string;
}

export type Role = 'user' | 'assistant' | 'system';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro';
}