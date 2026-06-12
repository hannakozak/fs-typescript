import {
	Entry,
	HealthCheckEntry,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from '../../types';

const assertNever = (value: never): never => {
	throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<div>
			<p>Health check rating: {entry.healthCheckRating}</p>
		</div>
	);
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
	return (
		<div>
			<p>
				Discharge: {entry.discharge.date} - {entry.discharge.criteria}
			</p>
		</div>
	);
};

const OccupationalHealthcareEntryDetails = ({
	entry,
}: {
	entry: OccupationalHealthcareEntry;
}) => {
	return (
		<div>
			<p>Employer: {entry.employerName}</p>

			{entry.sickLeave && (
				<p>
					Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
				</p>
			)}
		</div>
	);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case 'HealthCheck':
			return <HealthCheckEntryDetails entry={entry} />;

		case 'Hospital':
			return <HospitalEntryDetails entry={entry} />;

		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntryDetails entry={entry} />;

		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
