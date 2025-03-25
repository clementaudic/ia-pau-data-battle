import { ChatCreationButton } from '@components/chats/ChatCreationButton';
import { LandingText } from '@/components/landing/LandingText';
import { SubjectSelector } from '@components/landing/SubjectSelector';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import type { Subject } from '@lib/types';

interface AppPageProps {
    searchParams: Promise<{
        subject: Subject;
    }>;
}

export default async function AppPage({ searchParams }: AppPageProps) {
    const { subject } = await searchParams;
    
    return (
        <div className="flex flex-col items-center justify-center gap-20 size-full">
            <LandingText />
            <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-2xl font-semibold text-center">
                        What are you training for today?
                    </p>
                    <SuspenseBoundary fallback={null}>
                        <SubjectSelector/>
                    </SuspenseBoundary>
                </div>
                <div className="flex flex-wrap justify-center gap-10">
                    <ChatCreationButton subject={subject}/>
                </div>
            </div>
        </div>
    );
}
