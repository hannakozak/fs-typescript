import { z } from 'zod';
import { isGender } from './utils.ts';

export type DiagnosesType = {
	code: string;
	name: string;
	latin?: string;
};

export type Diagnosis = DiagnosesType;

export type Gender = 'male' | 'female' | 'other';

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export const HealthCheckRating = {
	Healthy: 0,
	LowRisk: 1,
	HighRisk: 2,
	CriticalRisk: 3,
} as const;

export type HealthCheckRating =
	(typeof HealthCheckRating)[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NewEntry = Omit<Entry, 'id'>;

export type NewPatientEntry =
	| Omit<HospitalEntry, 'id'>
	| Omit<OccupationalHealthcareEntry, 'id'>
	| Omit<HealthCheckEntry, 'id'>;

const BaseEntrySchema = z.object({
	description: z.string(),
	date: z.string(),
	specialist: z.string(),
	diagnosisCodes: z.array(z.string()).optional(),
});

export const EntrySchema = z.discriminatedUnion('type', [
	BaseEntrySchema.extend({
		type: z.literal('HealthCheck'),
		healthCheckRating: z.union([
			z.literal(HealthCheckRating.Healthy),
			z.literal(HealthCheckRating.LowRisk),
			z.literal(HealthCheckRating.HighRisk),
			z.literal(HealthCheckRating.CriticalRisk),
		]),
	}),

	BaseEntrySchema.extend({
		type: z.literal('Hospital'),
		discharge: z.object({
			date: z.string(),
			criteria: z.string(),
		}),
	}),

	BaseEntrySchema.extend({
		type: z.literal('OccupationalHealthcare'),
		employerName: z.string(),
		sickLeave: z
			.object({
				startDate: z.string(),
				endDate: z.string(),
			})
			.optional(),
	}),
]);

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string(),
	ssn: z.string(),
	gender: z.string().refine(isGender),
	occupation: z.string(),
	entries: z.array(z.unknown()).optional(),
});

export type NewPatientType = z.infer<typeof NewPatientSchema>;

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
