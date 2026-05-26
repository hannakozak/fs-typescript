import patientsDataJson from '../data/patients.ts';
import { NewPatientType } from '../types.ts';
import { PatientType } from '../types.ts';
import { v1 as uuid } from 'uuid';

const patientsData: PatientType[] = patientsDataJson as PatientType[];

const getEntries = (): Omit<PatientType, 'ssn'>[] => {
	return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

const addEntry = (entry: NewPatientType): PatientType => {
	const newEntry: PatientType = {
		id: uuid(), // also moved here — was being generated once at module load
		...entry,
	};
	patientsData.push(newEntry);
	return newEntry;
};

export default { getEntries, addEntry };
