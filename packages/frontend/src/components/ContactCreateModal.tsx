import { contactApi } from '@/api/ContactApi';
import { ContactDto } from '@/models/dto/ContactDto';
import {
	EuiButton,
	EuiButtonEmpty,
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
import { ReactElement, useState } from 'react';

interface ContactCreateModalProps {
	onCancel: () => void;
	onSave: (contact: ContactDto) => void;
}

export const ContactCreateModal = ({
	onCancel,
	onSave,
}: ContactCreateModalProps): ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const trimmedName = name.trim();
	const canSave = trimmedName.length > 0;

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=name]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>
					Add contact{/* LOC */}
				</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="Name" /* LOC */>
						<EuiFieldText
							name="name"
							value={name}
							onChange={(e): void => setName(e.target.value)}
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

						const result = await contactApi.create({
							name: trimmedName,
						});
						if (!result.ok) {
							setIsLoading(false);
							return;
						}

						onSave(result.val);
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
