import { z } from 'zod';

export type RequestConfigParams = Record<string, unknown>;

export type RequestConfigData = Record<string, unknown>;

export interface RequestConfig<P extends RequestConfigParams, D extends RequestConfigData>
    extends Omit<RequestInit, 'body'> {
    params?: P;
    data?: D;
    revalidateTags?: Array<string>;
    revalidatePages?: Array<string>;
    revalidateLayouts?: Array<string>;
}

interface Entity {
    id: string;
}

export interface User extends Entity {
    email: string;
    firstName: string;
    lastName: string;
}

export enum MessageSender {
    USER = 'USER',
    AI = 'AI',
}

export interface Message {
    sender: MessageSender;
    content: string;
}

export enum Subject {
    EQE = 'EQE',
    EPAC = 'EPAC',
}

export interface Chat extends Entity {
    createdAt: string;
    updatedAt: string;
    title: string;
    subject: Subject;
    messages: Message[];
    userId: User['id'];
}

export interface Quiz extends Entity {
    createdAt: string;
    title: string;
    subject: Subject;
    userId: User['id'];
}

export const loginSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Email is invalid" }),
    password: z.string({ message: 'Password is required' }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Email is invalid" }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1,'Last name is required'),
    password: z.string().min(1,'Password is required'),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const chatCreationSchema = z.object({
    subject: z.nativeEnum(Subject, { message: 'Subject is required' }),
});

export type ChatCreationData = z.infer<typeof chatCreationSchema>;

export const quizCreationSchema = z.object({
    subject: z.nativeEnum(Subject, { message: 'Subject is required' }),
});

export type QuizCreationData = z.infer<typeof quizCreationSchema>;
