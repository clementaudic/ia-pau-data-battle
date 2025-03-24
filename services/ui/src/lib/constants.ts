import { Subject } from '@lib/types';

export const GUEST_PAGE_ROUTE = '/guest' as const;

export const DEFAULT_ERROR_MESSAGE = 'An error occurred. Please try again.' as const;

export const SUBJECT_PARAM_KEY = 'subject';

export const DEFAULT_SUBJECT = Subject.EQE;
