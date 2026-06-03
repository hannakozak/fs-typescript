interface TotalProps {
	courseParts: { name: string; exerciseCount: number }[];
}

export const Total = ({ courseParts }: TotalProps) => {
	const totalExercises = courseParts.reduce(
		(sum, part) => sum + part.exerciseCount,
		0
	);
	return <p>Number of exercises {totalExercises}</p>;
};
