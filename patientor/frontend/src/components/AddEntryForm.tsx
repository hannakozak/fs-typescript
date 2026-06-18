import { useState } from 'react';
import {
	Button,
	TextField,
	Alert,
	MenuItem,
	Select,
	InputLabel,
} from '@mui/material';
import { EntryWithoutId, HealthCheckRating } from '../types';

interface Props {
	onSubmit: (entry: EntryWithoutId) => void;
	onCancel: () => void;
	error?: string;
}

type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
	const [type, setType] = useState<EntryType>('HealthCheck');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');

	const [healthCheckRating, setHealthCheckRating] = useState('');
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	const baseEntry = {
		date,
		description,
		specialist,
		diagnosisCodes: diagnosisCodes
			.split(',')
			.map((code) => code.trim())
			.filter(Boolean),
	};

	const submit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (type === 'HealthCheck') {
			onSubmit({
				...baseEntry,
				type: 'HealthCheck',
				healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
			});
		}

		if (type === 'OccupationalHealthcare') {
			onSubmit({
				...baseEntry,
				type: 'OccupationalHealthcare',
				employerName,
				sickLeave:
					sickLeaveStartDate && sickLeaveEndDate
						? {
								startDate: sickLeaveStartDate,
								endDate: sickLeaveEndDate,
							}
						: undefined,
			});
		}

		if (type === 'Hospital') {
			onSubmit({
				...baseEntry,
				type: 'Hospital',
				discharge: {
					date: dischargeDate,
					criteria: dischargeCriteria,
				},
			});
		}
	};

	return (
		<div
			style={{ border: '1px dashed black', padding: '1em', marginTop: '1em' }}
		>
			<h3>New Entry</h3>

			{error && <Alert severity="error">{error}</Alert>}

			<form onSubmit={submit}>
				<InputLabel>Entry type</InputLabel>
				<Select
					fullWidth
					value={type}
					onChange={({ target }) => setType(target.value as EntryType)}
				>
					<MenuItem value="HealthCheck">Health Check</MenuItem>
					<MenuItem value="OccupationalHealthcare">
						Occupational Healthcare
					</MenuItem>
					<MenuItem value="Hospital">Hospital</MenuItem>
				</Select>

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
					label="Diagnosis Codes comma-separated"
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>

				{type === 'HealthCheck' && (
					<TextField
						label="Health Check Rating (0-3)"
						fullWidth
						value={healthCheckRating}
						onChange={({ target }) => setHealthCheckRating(target.value)}
					/>
				)}

				{type === 'OccupationalHealthcare' && (
					<>
						<TextField
							label="Employer name"
							fullWidth
							value={employerName}
							onChange={({ target }) => setEmployerName(target.value)}
						/>
						<TextField
							label="Sick leave start date"
							fullWidth
							value={sickLeaveStartDate}
							onChange={({ target }) => setSickLeaveStartDate(target.value)}
						/>
						<TextField
							label="Sick leave end date"
							fullWidth
							value={sickLeaveEndDate}
							onChange={({ target }) => setSickLeaveEndDate(target.value)}
						/>
					</>
				)}

				{type === 'Hospital' && (
					<>
						<TextField
							label="Discharge date"
							fullWidth
							value={dischargeDate}
							onChange={({ target }) => setDischargeDate(target.value)}
						/>
						<TextField
							label="Discharge criteria"
							fullWidth
							value={dischargeCriteria}
							onChange={({ target }) => setDischargeCriteria(target.value)}
						/>
					</>
				)}

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

export default AddEntryForm;
