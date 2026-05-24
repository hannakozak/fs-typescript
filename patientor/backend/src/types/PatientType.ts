export type Gender = 'male' | 'female' | 'other';

export type PatientType = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
};
