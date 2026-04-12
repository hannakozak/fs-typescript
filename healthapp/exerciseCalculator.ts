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

const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);
