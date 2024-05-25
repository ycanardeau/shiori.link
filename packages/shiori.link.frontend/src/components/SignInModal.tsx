import { userApi } from '@/api/UserApi';
import { UserDto } from '@/models/dto/UserDto';
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
import { ReactElement, useState } from 'react';

interface SignInModalProps {
	onCancel: () => void;
	onSignIn: (user: UserDto) => void;
}

export const SignInModal = ({
	onCancel,
	onSignIn,
}: SignInModalProps): ReactElement => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=email]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>Sign in{/* LOC */}</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm component="form">
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
							email: email,
							password: password,
						});
						if (!signUpResult.ok) {
							setIsLoading(false);
							return;
						}

						onSignIn(signUpResult.val);
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
