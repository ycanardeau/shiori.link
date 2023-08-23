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

interface SignUpModalProps {
	onCancel: () => void;
}

export const SignUpModal = ({
	onCancel,
}: SignUpModalProps): React.ReactElement => {
	return (
		<EuiModal onClose={onCancel} initialFocus="[name=username]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>Sign up{/* LOC */}</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm component="form" autoComplete="newPassword">
					<EuiFormRow label="Username" /* LOC */>
						<EuiFieldText name="username" autoComplete="username" />
					</EuiFormRow>

					<EuiFormRow label="Email" /* LOC */>
						<EuiFieldText
							type="email"
							name="email"
							autoComplete="email"
						/>
					</EuiFormRow>

					<EuiFormRow label="Password" /* LOC */>
						<EuiFieldPassword
							name="newPassword"
							autoComplete="newPassword"
						/>
					</EuiFormRow>
				</EuiForm>
			</EuiModalBody>

			<EuiModalFooter>
				<EuiButtonEmpty onClick={onCancel}>
					Cancel{/* LOC */}
				</EuiButtonEmpty>

				<EuiButton type="submit" fill>
					Sign up{/* LOC */}
				</EuiButton>
			</EuiModalFooter>
		</EuiModal>
	);
};
