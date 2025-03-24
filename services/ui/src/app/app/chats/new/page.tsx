import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { ChatService } from '@lib/services/chat';
import { ChatSubject } from '@lib/types';
import { redirect } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface NewChatPageProps {
    params: Promise<{
        subject: ChatSubject;
    }>;
}

export default async function NewChatPage({ params }: NewChatPageProps) {
    const { subject } = await params;
    
    return (
       <div className="flex justify-center items-center size-full">
           <SuspenseBoundary>
               <ChatGenerator subject={subject}/>
           </SuspenseBoundary>
       </div>
    );
}

interface ChatGeneratorProps {
    subject: ChatSubject;
}

const ChatGenerator: FunctionComponent<ChatGeneratorProps> = async ({ subject }) => {
    const createdChat = await ChatService.createChat({ subject });
    
    if (!createdChat) {
        return redirect('/app');
    }
    
    redirect(`/app/chats/${createdChat.id}`);
}
