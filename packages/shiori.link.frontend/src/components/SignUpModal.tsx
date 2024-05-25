import { userApi } from '@/api/UserApi';
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
import React from 'react';

interface SignUpModalProps {
	onCancel: () => void;
	onSignUp: () => void;
}

export const SignUpModal = ({
	onCancel,
	onSignUp,
}: SignUpModalProps): React.ReactElement => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=email]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>Sign up{/* LOC */}</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm component="form" autoComplete="newPassword">
					<EuiFormRow label="Email" /* LOC */>
						<EuiFieldText
							type="email"
							name="email"
							autoComplete="email"
							value={email}
							onChange={(e): void => setEmail(e.target.value)}
						/>
					</EuiFormRow>

					<EuiFormRow label="Password" /* LOC */>
						<EuiFieldPassword
							name="newPassword"
							autoComplete="newPassword"
							value={password}
							onChange={(e): void => setPassword(e.target.value)}
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

						const signUpResult = await userApi.signUp({
							email: email,
							password: password,
						});
						if (!signUpResult.ok) {
							setIsLoading(false);
							return;
						}

						onSignUp();
					}}
					fill
					isLoading={isLoading}
				>
					Sign up{/* LOC */}
				</EuiButton>
			</EuiModalFooter>
		</EuiModal>
	);
};
