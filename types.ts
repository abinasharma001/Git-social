export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  email?: string;
  company?: string;
  twitter?: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}
