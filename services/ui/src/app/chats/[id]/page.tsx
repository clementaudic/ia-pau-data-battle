import { ChatSection } from '@components/chats/ChatSection';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import type { Chat } from '@lib/types';

interface ChatPageProps {
    params: Promise<{
        id: Chat['id'];
    }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
    const { id } = await params;
    
    return (
        <SuspenseBoundary>
            <ChatSection chatId={id}/>
        </SuspenseBoundary>
    );
}
