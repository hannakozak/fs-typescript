import { Gender } from './types.ts';

export const isGender = (value: string): value is Gender =>
	['male', 'female', 'other'].includes(value);
