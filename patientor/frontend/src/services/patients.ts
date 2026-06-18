import axios from 'axios';
import { EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getById = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const addPatientEntry = async (
	patientId: string,
	entry: EntryWithoutId
): Promise<Patient> => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients/${patientId}/entries`,
		entry
	);

	return data;
};

export default {
	getAll,
	getById,
	create,
	addPatientEntry,
};
