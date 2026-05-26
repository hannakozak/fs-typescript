import { z } from 'zod';
import { isGender } from './utils.ts';

export type DiagnosesType = {
	code: string;
	name: string;
	latin?: string;
};

export type Gender = 'male' | 'female' | 'other';

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string(),
	ssn: z.string(),
	gender: z.string().refine(isGender),
	occupation: z.string(),
});

export type NewPatientType = z.infer<typeof NewPatientSchema>;

export interface PatientType extends NewPatientType {
	id: string;
}
