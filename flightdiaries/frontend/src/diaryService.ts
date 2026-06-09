import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => {
	return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const create = (entry: NewDiaryEntry) => {
	return axios
		.post<DiaryEntry>(baseUrl, entry)
		.then((response) => response.data);
};

export default { getAll, create };
