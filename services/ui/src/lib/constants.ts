import { Subject } from '@lib/types';

export const LOGIN_PAGE_ROUTE = '/auth/login' as const;

export const DEFAULT_ERROR_MESSAGE = 'An error occurred. Please try again.' as const;

export const SUBJECT_PARAM_KEY = 'subject';

export const DEFAULT_SUBJECT = Subject.EQE;
