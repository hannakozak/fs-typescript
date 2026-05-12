import express, { response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
	res.send('pong');
});

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (!height || !weight || isNaN(height) || isNaN(weight)) {
		res.status(400).json({
			error: 'malformatted parameters',
		});
		return;
	}
	const bmi = calculateBmi(Number(height), Number(weight));

	res.json({ height: Number(height), weight: Number(weight), bmi });
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { daily_exercises, target } = req.body as any;

	if (daily_exercises === undefined || target === undefined) {
		res.status(400).json({ error: 'parameters missing' });
		return;
	}

	if (
		!Array.isArray(daily_exercises) ||
		isNaN(Number(target)) ||
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		daily_exercises.some((d: any) => isNaN(Number(d)))
	) {
		res.status(400).json({ error: 'malformatted parameters' });
		return;
	}

	const periodLength = daily_exercises.length;
	const trainingDays = daily_exercises.filter((d: number) => d > 0).length;
	const average =
		daily_exercises.reduce((sum: number, d: number) => sum + d, 0) /
		periodLength;
	const targetNum = Number(target);
	const success = average >= targetNum;

	let rating: number;
	let ratingDescription: string;
	if (average >= targetNum) {
		rating = 3;
		ratingDescription = 'great job';
	} else if (average >= targetNum * 0.75) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	} else {
		rating = 1;
		ratingDescription = 'bad';
	}

	res.json({
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target: targetNum,
		average,
	});
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
