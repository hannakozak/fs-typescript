import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient } from '../../types';

const PatientPage = () => {
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
				patient.entries.map((_entry, index) => <div key={index}>Entry</div>)
			)}
		</div>
	);
};

export default PatientPage;
