import {
	EuiButton,
	EuiButtonEmpty,
	EuiFieldPassword,
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiModalHeaderTitle,
} from '@elastic/eui';

interface SignInModalProps {
	onCancel: () => void;
}

export const SignInModal = ({
	onCancel,
}: SignInModalProps): React.ReactElement => {
	return (
		<EuiModal onClose={onCancel} initialFocus="[name=username]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>Sign in{/* LOC */}</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm component="form">
					<EuiFormRow label="Username" /* LOC */>
						<EuiFieldText
							type="username"
							name="username"
							autoComplete="username"
						/>
					</EuiFormRow>

					<EuiFormRow label="Password" /* LOC */>
						<EuiFieldPassword
							name="currentPassword"
							autoComplete="currentPassword"
						/>
					</EuiFormRow>
				</EuiForm>
			</EuiModalBody>

			<EuiModalFooter>
				<EuiButtonEmpty onClick={onCancel}>
					Cancel{/* LOC */}
				</EuiButtonEmpty>

				<EuiButton type="submit" fill>
					Sign in{/* LOC */}
				</EuiButton>
			</EuiModalFooter>
		</EuiModal>
	);
};
