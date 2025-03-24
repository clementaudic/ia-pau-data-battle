import { LandingText } from '@/components/LandingText';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { RiQuestionAnswerFill, RiQuestionnaireFill } from 'react-icons/ri';

export default function AppPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-20 size-full">
            <LandingText />
            <div className="flex gap-10">
                <ActionButton
                    icon={RiQuestionAnswerFill}
                    text="New chat"
                    href="/app/chats/new"
                />
                <ActionButton
                    icon={RiQuestionnaireFill}
                    text="New quiz"
                    href="/app/quizzes/new"
                />
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: IconType;
    text: string;
    href: string;
}

function ActionButton({ icon: Icon, text, href }: ActionButtonProps) {
    return (
        <Link href={href}>
            <div className="flex flex-col justify-center items-center gap-5 size-60 p-5 text-primary not-hover:outline not-hover:outline-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300">
                <Icon className="size-20" />
                <p className="text-2xl font-semibold">
                    {text}
                </p>
            </div>
        </Link>
    );
}
