import { NewPatientType } from './types/NewPatientType.ts';
import { Gender } from './types/PatientType.ts';

const isGender = (value: string): value is Gender =>
	['male', 'female', 'other'].includes(value);

const parseNewPatient = (object: unknown): NewPatientType => {
	if (!object || typeof object !== 'object') {
		throw new Error('Invalid data');
	}

	const b = object as Record<string, unknown>;

	if (
		typeof b.name !== 'string' ||
		typeof b.dateOfBirth !== 'string' ||
		typeof b.ssn !== 'string' ||
		typeof b.gender !== 'string' ||
		!isGender(b.gender) ||
		typeof b.occupation !== 'string'
	) {
		throw new Error('Missing or invalid fields');
	}

	return {
		name: b.name,
		dateOfBirth: b.dateOfBirth,
		ssn: b.ssn,
		gender: b.gender,
		occupation: b.occupation,
	};
};

export default parseNewPatient;
