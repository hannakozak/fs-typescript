import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Patient } from '../../types';
import EntryDetails from './EntryDetails';
import Box from '@mui/material/Box';

interface PatientPageProps {
	diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (!id) return;

		patientService.getById(id).then((data) => {
			setPatient(data);
		});
	}, [id]);

	if (!patient) {
		return <div>Loading...</div>;
	}

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
		</div>
	);
};

export default PatientPage;
