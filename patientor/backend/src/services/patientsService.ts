import patientsData from '../data/patients.ts';
import { NewPatientType, Patient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getEntries = (): Omit<Patient, 'ssn'>[] => {
	return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

const addEntry = (entry: NewPatientType): Patient => {
	const newEntry: Patient = {
		id: uuid(),
		entries: [],
		...entry,
	};
	patientsData.push(newEntry);
	return newEntry;
};

const getPatientById = (id: string): Patient | undefined => {
	return patientsData.find((patient) => patient.id === id);
};
export default { getEntries, addEntry, getPatientById };
