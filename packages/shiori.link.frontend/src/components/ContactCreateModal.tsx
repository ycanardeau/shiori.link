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

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const trimmedFirstName = firstName.trim();
	const trimmedLastName = lastName.trim();
	const canSave = trimmedFirstName.length > 0 || trimmedLastName.length > 0;

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=firstName]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>
					Add contact{/* LOC */}
				</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="First name" /* LOC */>
						<EuiFieldText
							name="firstName"
							value={firstName}
							onChange={(e): void => setFirstName(e.target.value)}
							disabled={isLoading}
						/>
					</EuiFormRow>

					<EuiFormRow label="Last name" /* LOC */>
						<EuiFieldText
							name="lastName"
							value={lastName}
							onChange={(e): void => setLastName(e.target.value)}
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
							firstName: trimmedFirstName,
							lastName: trimmedLastName,
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
