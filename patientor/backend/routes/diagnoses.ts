import type { Response } from 'express';
import express from 'express';
import DiagnosesService from '../services/diagnosesService.ts';
import { DiagnosesType } from '../types/DiagnosesType.ts';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<DiagnosesType[]>) => {
	const data = DiagnosesService.getEntries();
	res.send(data);
});

export default diagnosesRouter;
