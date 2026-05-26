import type { Request, Response } from 'express';
import express from 'express';
import patientsService from '../services/patientsService.ts';
import { PatientType } from '../types.ts';
import { NewPatientType } from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	const data = patientsService.getEntries();
	res.send(data);
});

patientsRouter.post(
	'/',
	newPatientParser,
	(
		req: Request<unknown, unknown, NewPatientType>,
		res: Response<PatientType>
	) => {
		const addedEntry = patientsService.addEntry(req.body);
		res.json(addedEntry);
	}
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
