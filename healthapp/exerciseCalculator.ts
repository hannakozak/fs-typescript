interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (
	dailyExercises: number[],
	target: number
): ExerciseResult => {
	const periodLength = dailyExercises.length;

	const trainingDays = dailyExercises.filter((h) => h > 0).length;

	const totalHours = dailyExercises.reduce((sum, h) => sum + h, 0);

	const average = totalHours / periodLength;

	const success = average >= target;

	let rating: number;
	let ratingDescription: string;

	if (average >= target) {
		rating = 3;
		ratingDescription = 'great job!';
	} else if (average >= target * 0.75) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	} else {
		rating = 1;
		ratingDescription = 'you need to work harder';
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

const args = process.argv.slice(2);

if (args.length < 2) {
	console.log(
		'Please provide the target and daily exercise hours as arguments.'
	);
	process.exit(1);
}

const [targetArg, ...exerciseArgs] = args;
const target = Number(targetArg);
const dailyExercises = exerciseArgs.map(Number);
const result = calculateExercises(dailyExercises, target);
console.log(result);
