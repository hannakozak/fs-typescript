import type { Response } from 'express';
import express from 'express';
import patientsService from '../services/patientsService.ts';
import { PatientType } from '../types/PatientType.ts';
import parseNewPatient from '../utils.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<PatientType[]>) => {
	const data = patientsService.getEntries();
	res.send(data);
});

patientsRouter.post('/', (req, res): void => {
	try {
		const newPatient = parseNewPatient(req.body);
		const addedEntry = patientsService.addEntry(newPatient);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default patientsRouter;
