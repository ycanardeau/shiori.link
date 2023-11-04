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

interface SignInModalProps {
	onCancel: () => void;
	onSignIn: () => void;
}

export const SignInModal = ({
	onCancel,
	onSignIn,
}: SignInModalProps): React.ReactElement => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

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
							value={username}
							onChange={(e): void => setUsername(e.target.value)}
						/>
					</EuiFormRow>

					<EuiFormRow label="Password" /* LOC */>
						<EuiFieldPassword
							name="currentPassword"
							autoComplete="currentPassword"
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

						const signUpResult = await userApi.login({
							username: username,
							password: password,
						});
						if (!signUpResult.ok) {
							setIsLoading(false);
							return;
						}

						onSignIn();
					}}
					fill
					isLoading={isLoading}
				>
					Sign in{/* LOC */}
				</EuiButton>
			</EuiModalFooter>
		</EuiModal>
	);
};
