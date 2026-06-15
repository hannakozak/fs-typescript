import patientsData from '../data/patients.ts';
import { NewPatientType, Patient, NewPatientEntry, Entry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getEntries = (): Omit<Patient, 'ssn'>[] => {
	return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

const addEntry = (entry: NewPatientType): Patient => {
	const newPatient: Patient = {
		id: uuid(),
		...entry,
		entries: [],
	};

	patientsData.push(newPatient);
	return newPatient;
};

const addEntryToPatient = (
	patientId: string,
	entry: NewPatientEntry
): Patient | undefined => {
	const patient = patientsData.find((p) => p.id === patientId);

	if (!patient) {
		return undefined;
	}

	const newEntry: Entry = {
		id: uuid(),
		...entry,
	};

	patient.entries.push(newEntry);

	return patient;
};

const getPatientById = (id: string): Patient | undefined => {
	return patientsData.find((patient) => patient.id === id);
};

export default {
	getEntries,
	addEntry,
	addEntryToPatient,
	getPatientById,
};
