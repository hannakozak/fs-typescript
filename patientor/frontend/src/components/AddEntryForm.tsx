import { useState } from 'react';
import {
	Alert,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../types';

interface Props {
	onSubmit: (entry: EntryWithoutId) => void;
	onCancel: () => void;
	error?: string;
	diagnoses: Diagnosis[];
}

type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

const AddEntryForm = ({ onSubmit, onCancel, error, diagnoses }: Props) => {
	const [type, setType] = useState<EntryType>('HealthCheck');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState('0');

	const baseEntry = {
		date,
		description,
		specialist,
		diagnosisCodes,
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
					type="date"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
					InputLabelProps={{ shrink: true }}
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
				<FormControl fullWidth>
					<InputLabel>Diagnosis codes</InputLabel>
					<Select
						multiple
						value={diagnosisCodes}
						onChange={(event) =>
							setDiagnosisCodes(event.target.value as string[])
						}
						input={<OutlinedInput label="Diagnosis codes" />}
					>
						{diagnoses.map((diagnosis) => (
							<MenuItem key={diagnosis.code} value={diagnosis.code}>
								{diagnosis.code} — {diagnosis.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{type === 'HealthCheck' && (
					<FormControl fullWidth>
						<InputLabel>Health Check Rating</InputLabel>
						<Select
							value={healthCheckRating}
							label="Health Check Rating"
							onChange={({ target }) => setHealthCheckRating(target.value)}
						>
							<MenuItem value="0">0 — Healthy</MenuItem>
							<MenuItem value="1">1 — Low Risk</MenuItem>
							<MenuItem value="2">2 — High Risk</MenuItem>
							<MenuItem value="3">3 — Critical Risk</MenuItem>
						</Select>
					</FormControl>
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
