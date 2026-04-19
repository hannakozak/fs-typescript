const calculateBmi = (height: number, weight: number): string => {
	height = height / 100;
	const bmi = weight / (height * height);

	if (bmi < 18.5) return 'Underweight';
	if (bmi >= 18.5 && bmi < 24.9) return 'Normal range';
	if (bmi >= 25 && bmi < 29.9) return 'Overweight';
	return 'Obese';
};

const args = process.argv.slice(2);

if (args.length !== 2) {
	console.log('Please provide the height and weight as arguments.');
	process.exit(1);
}

const [heightArg, weightArg] = args;
const height = Number(heightArg);
const weight = Number(weightArg);

console.log(calculateBmi(height, weight));
