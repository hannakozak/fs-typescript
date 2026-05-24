import patientsData from '../data/patients.ts';
import { NewPatientType } from '../types/NewPatientType.ts';
import { PatientType } from '../types/PatientType.ts';
import { v1 as uuid } from 'uuid';
const id = uuid();

const getEntries = (): PatientType[] => {
	return patientsData;
};

const addEntry = (entry: NewPatientType): PatientType => {
	const newEntry = {
		id: id,
		...entry,
	};
	patientsData.push(newEntry);
	return newEntry;
};

export default {
	getEntries,
	addEntry,
};
