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
	entries: z.array(z.object({})).optional(),
});

export type NewPatientType = z.infer<typeof NewPatientSchema>;

export interface PatientType extends NewPatientType {
	id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
