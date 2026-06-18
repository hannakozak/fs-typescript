import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Patient } from '../../types';
import EntryDetails from './EntryDetails';
import Box from '@mui/material/Box';
import axios from 'axios';
import AddHealthCheckEntryForm from '../AddHealthCheckEntryForm';
import { EntryWithoutId } from '../../types';
import Button from '@mui/material/Button';

interface PatientPageProps {
	diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const { id } = useParams<{ id: string }>();
	const [error, setError] = useState<string>();
	const [entryFormVisible, setEntryFormVisible] = useState(false);

	useEffect(() => {
		if (!id) return;

		patientService.getById(id).then((data) => {
			setPatient(data);
		});
	}, [id]);

	if (!patient) {
		return <div>Loading...</div>;
	}

	const submitNewEntry = async (entry: EntryWithoutId) => {
		try {
			const updatedPatient = await patientService.addPatientEntry(
				patient.id,
				entry
			);
			setPatient(updatedPatient);
			setEntryFormVisible(false);
			setError(undefined);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data?.error || 'Something went wrong');
			} else {
				setError('Something went wrong');
			}
		}
	};

	return (
		<div>
			<h2>{patient.name}</h2>

			<p>Gender: {patient.gender}</p>
			<p>SSN: {patient.ssn}</p>
			<p>Occupation: {patient.occupation}</p>

			<h3>Entries</h3>

			{patient.entries.length === 0 ? (
				<p>No entries yet</p>
			) : (
				patient.entries.map((entry) => (
					<Box
						key={entry.id}
						sx={{
							border: '1px solid black',
							borderRadius: 1,
							padding: 1,
							marginBottom: 1,
						}}
					>
						<p>
							<strong>{entry.date}</strong> {entry.description}
						</p>

						{entry.diagnosisCodes && (
							<ul>
								{entry.diagnosisCodes.map((code) => {
									const diagnosis = diagnoses.find((d) => d.code === code);

									return (
										<li key={code}>
											{code} {diagnosis?.name}
										</li>
									);
								})}
							</ul>
						)}

						<EntryDetails entry={entry} />

						<p>Diagnosed by {entry.specialist}</p>
					</Box>
				))
			)}
			{entryFormVisible ? (
				<AddHealthCheckEntryForm
					onSubmit={submitNewEntry}
					onCancel={() => setEntryFormVisible(false)}
					error={error}
				/>
			) : (
				<Button variant="contained" onClick={() => setEntryFormVisible(true)}>
					Add new entry
				</Button>
			)}
		</div>
	);
};

export default PatientPage;
