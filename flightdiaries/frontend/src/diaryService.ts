import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry, ValidationError } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
	try {
		const response = await axios.get<DiaryEntry[]>(baseUrl);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
			console.error('Axios error:', error.message);
		} else {
			console.error('Unexpected error:', error);
		}

		console.error('Error fetching diary entries:', error);
		throw error;
	}
};

const create = async (entry: NewDiaryEntry) => {
	try {
		const response = await axios.post<DiaryEntry>(baseUrl, entry);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
			console.error('Axios error:', error.message);
		} else {
			console.error('Unexpected error:', error);
		}

		console.error('Error creating diary entry:', error);
		throw error;
	}
};

export default { getAll, create };
