import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { ChatService } from '@lib/services/chat';
import type { Chat } from '@lib/types';
import type { FunctionComponent } from 'react';

interface ChatPageProps {
    params: Promise<{
        id: Chat['id'];
    }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
    const { id } = await params;
    
    return (
        <SuspenseBoundary>
            <ChatPageContent chatId={id}/>
        </SuspenseBoundary>
    );
}

interface ChatPageContentProps {
    chatId: Chat['id'];
}

const ChatPageContent: FunctionComponent<ChatPageContentProps> = async ({ chatId }) => {
    const chat = await ChatService.getChat(chatId);
    
    if (!chat) {
        return (
            <div>
                Chat not found
            </div>
        );
    }
    
    return (
        <div>
        
        </div>
    );
}
