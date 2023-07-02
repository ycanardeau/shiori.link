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
						try {
							setIsLoading(true);

							// TODO
							await new Promise((resolve) =>
								setTimeout(resolve, 1000),
							);

							onSave({
								_NoteDtoBrand: undefined,
								id: 1,
								createdAt: new Date().toISOString(),
								user: {
									_UserDtoBrand: undefined,
									id: 1,
									createdAt: new Date().toISOString(),
									userName: 'aigamo',
								},
								text: text.trim(),
							});
						} finally {
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
