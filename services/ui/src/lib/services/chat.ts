import { ApiService } from '@lib/services/api';
import type { Chat, ChatCreationData } from '@lib/types';

export class ChatService {
    public static async getChats() {
        return ApiService.get<Array<Chat>>('/chats');
    }
    
    public static async getChat(id: Chat['id']) {
        return ApiService.get<Chat>(`/chats/${id}`);
    }
    
    public static async createChat(data: ChatCreationData) {
        return ApiService.post<Chat>('/chats', { data });
    }
    
    public static async clearChat(id: Chat['id']) {
        return ApiService.patch<Chat>(`/chats/${id}/clear`);
    }
    
    public static async deleteChat(id: Chat['id']) {
        return ApiService.delete<null>(`/chats/${id}`);
    }
}
