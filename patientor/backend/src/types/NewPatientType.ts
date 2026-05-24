import { PatientType } from './PatientType.ts';

export type NewPatientType = Omit<PatientType, 'id'>;
