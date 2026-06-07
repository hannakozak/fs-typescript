import { useState, useEffect } from 'react';
import diaryService from './diaryService';
import './App.css';
import type { DiaryEntry } from './types';

function App() {
	const [diary, setDiary] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		diaryService.getAll().then((diaryEntries) => {
			setDiary(diaryEntries);
		});
	}, []);

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
			</section>
		</>
	);
}

export default App;
