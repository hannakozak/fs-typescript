import type { Response } from 'express';
import express from 'express';
import patientsService from '../services/patientsService.ts';
import { PatientType } from '../types/PatientType.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<PatientType[]>) => {
	const data = patientsService.getEntries();
	res.send(data);
});

export default patientsRouter;
