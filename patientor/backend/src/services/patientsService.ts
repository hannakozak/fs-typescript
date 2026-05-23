import patientsData from '../data/patients.ts';
import { PatientType } from '../types/PatientType.ts';

const getEntries = (): PatientType[] => {
	return patientsData;
};

export default {
	getEntries,
};
