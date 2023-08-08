import { NotebookDto } from '@/models/dto/NotebookDto';
import {
	EuiButton,
	EuiButtonEmpty,
	EuiButtonIcon,
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiModalHeaderTitle,
	useGeneratedHtmlId,
} from '@elastic/eui';
import { OpenRegular } from '@fluentui/react-icons';
import React from 'react';

interface NotebookCreateModalProps {
	onCancel: () => void;
	onSave: (note: NotebookDto) => void;
}

export const NotebookCreateModal = ({
	onCancel,
	onSave,
}: NotebookCreateModalProps): React.ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [name, setName] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const trimmedName = name.trim();
	const canSave = trimmedName.length > 0;

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=url]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>
					Add notebook{/* LOC */}
				</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="Name" /* LOC */>
						<EuiFieldText
							name="url"
							value={name}
							onChange={(e): void => setName(e.target.value)}
							disabled={isLoading}
							append={
								<EuiButtonIcon
									iconType={OpenRegular}
									href={trimmedName}
									target="_blank"
									isDisabled={trimmedName.length === 0}
									tabIndex={-1}
								/>
							}
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

						//onSave(noteCreateResult.val);
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
