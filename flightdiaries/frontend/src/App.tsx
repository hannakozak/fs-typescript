import { useState, useEffect } from 'react';
import diaryService from './diaryService';
import './App.css';
import type { DiaryEntry, Weather, Visibility } from './types';

function App() {
	const [diary, setDiary] = useState<DiaryEntry[]>([]);
	const [date, setDate] = useState('');
	const [weather, setWeather] = useState<Weather>('sunny');
	const [visibility, setVisibility] = useState<Visibility>('great');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		diaryService.getAll().then((diaryEntries) => {
			setDiary(diaryEntries);
		});
	}, []);

	const entryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const newDiary = {
			date,
			weather,
			visibility,
		};

		try {
			const createdEntry = await diaryService.create(newDiary);
			setDiary(diary.concat(createdEntry));
		} catch (error) {
			setErrorMessage('Error creating diary entry');
			setTimeout(() => {
				setErrorMessage('');
			}, 5000);
		}
	};

	const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];
	const weatherOptions: Weather[] = [
		'sunny',
		'rainy',
		'cloudy',
		'stormy',
		'windy',
	];

	return (
		<>
			<section id="center">
				<h1>Flight Diaries</h1>
				{diary.map((d) => (
					<div key={d.id}>
						<p>
							{d.date} - {d.weather} - {d.visibility}
						</p>
					</div>
				))}
				{errorMessage && (
					<div style={{ color: 'red', marginBottom: '1rem' }}>
						{errorMessage}
					</div>
				)}
				<form onSubmit={entryCreation}>
					<div>
						<label>
							Date:
							<input
								type="date"
								value={date}
								onChange={({ target }) => setDate(target.value)}
							/>
						</label>
					</div>

					<div>
						<strong>Visibility:</strong>

						{visibilityOptions.map((option) => (
							<label key={option}>
								<input
									type="radio"
									name="visibility"
									value={option}
									checked={visibility === option}
									onChange={({ target }) =>
										setVisibility(target.value as Visibility)
									}
								/>
								{option}
							</label>
						))}
					</div>

					<div>
						<strong>Weather:</strong>

						{weatherOptions.map((option) => (
							<label key={option}>
								<input
									type="radio"
									name="weather"
									value={option}
									checked={weather === option}
									onChange={({ target }) => setWeather(target.value as Weather)}
								/>
								{option}
							</label>
						))}
					</div>
					<button type="submit">Add</button>
				</form>
			</section>
		</>
	);
}

export default App;
