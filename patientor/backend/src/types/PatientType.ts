export type PatientType = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: 'male' | 'female' | 'other' | string;
	occupation: string;
};
