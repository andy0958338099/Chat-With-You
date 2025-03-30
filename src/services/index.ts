// Service interfaces for the application

export interface AuthService {
  login(username: string, password: string): Promise<boolean>;
  register(username: string, email: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<any>;
}

export interface ChatService {
  getChats(): Promise<any[]>;
  getChatById(id: string): Promise<any>;
  sendMessage(chatId: string, message: string): Promise<any>;
}

export interface ContactService {
  getContacts(): Promise<any[]>;
  addContact(userId: string): Promise<any>;
  removeContact(userId: string): Promise<boolean>;
}

export interface AIAssistantService {
  getAssistants(): Promise<any[]>;
  getAssistantById(id: string): Promise<any>;
  createAssistant(data: any): Promise<any>;
  updateAssistant(id: string, data: any): Promise<any>;
  deleteAssistant(id: string): Promise<boolean>;
}

export interface SubscriptionService {
  getPlans(): Promise<any[]>;
  getCurrentSubscription(): Promise<any>;
  subscribe(planId: string): Promise<boolean>;
  cancelSubscription(): Promise<boolean>;
}
