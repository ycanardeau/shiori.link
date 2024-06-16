import { NoteDto } from '@/models/dto/NoteDto';
import {
	EuiButton,
	EuiButtonEmpty,
	EuiFieldNumber,
	EuiForm,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiModalHeaderTitle,
	useGeneratedHtmlId,
} from '@elastic/eui';
import { ReactElement, useState } from 'react';

interface DateNoteCreateModalProps {
	onCancel: () => void;
	onSave: (note: NoteDto) => void;
}

export const DateNoteCreateModal = ({
	onCancel,
	onSave,
}: DateNoteCreateModalProps): ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [second, setSecond] = useState('');
	const [offset, setOffset] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const canSave = true; /* TODO */

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=year]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>Add date{/* LOC */}</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="Year" /* LOC */>
						<EuiFieldNumber
							name="year"
							value={year}
							onChange={(e): void => setYear(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Month" /* LOC */>
						<EuiFieldNumber
							name="month"
							value={month}
							onChange={(e): void => setMonth(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Day" /* LOC */>
						<EuiFieldNumber
							name="day"
							value={day}
							onChange={(e): void => setDay(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Hour" /* LOC */>
						<EuiFieldNumber
							name="hour"
							value={hour}
							onChange={(e): void => setHour(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Minute" /* LOC */>
						<EuiFieldNumber
							name="minute"
							value={minute}
							onChange={(e): void => setMinute(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Second" /* LOC */>
						<EuiFieldNumber
							name="second"
							value={second}
							onChange={(e): void => setSecond(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Offset" /* LOC */>
						<EuiFieldNumber
							name="offset"
							value={offset}
							onChange={(e): void => setOffset(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>
				</EuiForm>
			</EuiModalBody>

			<EuiModalFooter>
				<EuiButtonEmpty onClick={onCancel}>
					Cancel{/* LOC */}
				</EuiButtonEmpty>

				<EuiButton
					type="submit"
					onClick={async (): Promise<void> => {
						setIsLoading(true);

						/* TODO: const noteCreateResult = await noteApi.createDate({
							url: normalizedUrl,
							title: title,
						});
						if (!noteCreateResult.ok) {
							setIsLoading(false);
							return;
						}

						onSave(noteCreateResult.val); */
					}}
					fill
					disabled={!canSave}
					isLoading={isLoading}
				>
					Save{/* LOC */}
				</EuiButton>
			</EuiModalFooter>
		</EuiModal>
	);
};
