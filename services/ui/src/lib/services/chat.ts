import { ApiService } from '@lib/services/api';
import type { Message, Chat, ChatCreationData, ChatQuestionAskData, ChatQuestionAskTemporaryData } from '@lib/types';

export class ChatService {
    public static async getChats() {
        return ApiService.get<Array<Chat>>('/chats');
    }
    
    public static async askQuestionTemporary(data: ChatQuestionAskTemporaryData) {
        return ApiService.post<Message>('/chats/temporary/ask-question', { data });
    }
    
    public static async getChat(id: Chat['id']) {
        return ApiService.get<Chat>(`/chats/${id}`);
    }
    
    public static async createChat(data: ChatCreationData) {
        return ApiService.post<Chat>('/chats', { data });
    }
    
    public static async askQuestion(id: Chat['id'], data: ChatQuestionAskData) {
        return ApiService.post<Message>(`/chats/${id}/ask-question`, { data });
    }
    
    public static async clearChat(id: Chat['id']) {
        return ApiService.patch<Chat>(`/chats/${id}/clear`);
    }
    
    public static async deleteChat(id: Chat['id']) {
        return ApiService.delete<null>(`/chats/${id}`);
    }
}
