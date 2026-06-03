interface ContentProps {
	courseParts: { name: string; exerciseCount: number }[];
}

export const Content = ({ courseParts }: ContentProps) => {
	return (
		<div>
			{courseParts.map((part) => (
				<p key={part.name}>
					{part.name} {part.exerciseCount}
				</p>
			))}
		</div>
	);
};
