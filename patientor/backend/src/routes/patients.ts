import type { Request, Response } from 'express';
import express from 'express';
import patientsService from '../services/patientsService.ts';
import { NewPatientEntry, Patient } from '../types.ts';
import { NewPatientType } from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	const data = patientsService.getEntries();
	res.send(data);
});

patientsRouter.get('/:id', (req, res) => {
	const patient = patientsService.getPatientById(req.params.id);
	if (patient) {
		res.json(patient);
	} else {
		res.status(404).send({ error: 'Patient not found' });
	}
});

patientsRouter.post(
	'/:id/entries',
	(
		req: Request<{ id: string }, unknown, NewPatientEntry>,
		res: Response<Patient>
	) => {
		const patientId = req.params.id;
		const newEntry = req.body;
		res
			.status(201)
			.json(patientsService.addEntryToPatient(patientId, newEntry));
	}
);

patientsRouter.post(
	'/',
	newPatientParser,
	(req: Request<unknown, unknown, NewPatientType>, res: Response<Patient>) => {
		const addedEntry = patientsService.addEntry(req.body);
		res.json(addedEntry);
	}
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
