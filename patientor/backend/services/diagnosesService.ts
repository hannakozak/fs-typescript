import diagnosesData from '../data/diagnoses.ts';
import { DiagnosesType } from '../types/DiagnosesType.ts';

const getEntries = (): DiagnosesType[] => {
	return diagnosesData;
};

export default {
	getEntries,
};
