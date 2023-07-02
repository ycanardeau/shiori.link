import { noteApi } from '@/api/NoteApi';
import { NoteDto } from '@/models/responses/NoteDto';
import {
	EuiButton,
	EuiButtonEmpty,
	EuiForm,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiModalHeaderTitle,
	EuiTextArea,
	useGeneratedHtmlId,
} from '@elastic/eui';
import React from 'react';

interface NoteCreateModalProps {
	onCancel: () => void;
	onSave: (note: NoteDto) => void;
}

export const NoteCreateModal = ({
	onCancel,
	onSave,
}: NoteCreateModalProps): React.ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [text, setText] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const canSave = text.trim().length > 0;

	return (
		<EuiModal
			style={{ width: 600 }}
			onClose={onCancel}
			initialFocus="[name=text]"
		>
			<EuiModalHeader>
				<EuiModalHeaderTitle>Add note{/* LOC */}</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="Text" /* LOC */ fullWidth>
						<EuiTextArea
							name="text"
							fullWidth
							value={text}
							onChange={(e): void => setText(e.target.value)}
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

						const result = await noteApi.create({ text: text });
						if (result.ok) {
							onSave(result.val);
						} else {
							setIsLoading(false);
						}
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
