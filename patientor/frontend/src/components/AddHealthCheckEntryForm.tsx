import { useState } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import { EntryWithoutId, HealthCheckRating } from '../types';

interface Props {
	onSubmit: (entry: EntryWithoutId) => void;
	onCancel: () => void;
	error?: string;
}

const AddHealthCheckEntryForm = ({ onSubmit, onCancel, error }: Props) => {
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');

	const submit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		onSubmit({
			type: 'HealthCheck',
			date,
			description,
			specialist,
			healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
			diagnosisCodes: diagnosisCodes
				.split(',')
				.map((code) => code.trim())
				.filter(Boolean),
		});
	};

	return (
		<div
			style={{ border: '1px dashed black', padding: '1em', marginTop: '1em' }}
		>
			<h3>New HealthCheck Entry</h3>

			{error && <Alert severity="error">{error}</Alert>}

			<form onSubmit={submit}>
				<TextField
					label="Date"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<TextField
					label="Health Check Rating (0-3)"
					fullWidth
					value={healthCheckRating}
					onChange={({ target }) => setHealthCheckRating(target.value)}
				/>
				<TextField
					label="Diagnosis Codes comma-separated"
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>

				<Button variant="contained" type="submit">
					Add
				</Button>
				<Button variant="outlined" onClick={onCancel}>
					Cancel
				</Button>
			</form>
		</div>
	);
};

export default AddHealthCheckEntryForm;
