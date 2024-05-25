import { userApi } from '@/api/UserApi';
import { AppButton } from '@/components/AppButton';
import { useAuthentication } from '@/components/AuthenticationProvider';
import { UserLoginRequest } from '@/models/requests/UserLoginRequest';
import {
	EuiButton,
	EuiFieldPassword,
	EuiFieldText,
	EuiFlexGroup,
	EuiFlexItem,
	EuiForm,
	EuiFormRow,
	EuiPanel,
	EuiSpacer,
	EuiText,
	EuiTitle,
} from '@elastic/eui';
import { FormEvent, ReactElement, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = (): ReactElement => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const authentication = useAuthentication();
	const navigate = useNavigate();

	const login = useCallback(
		async (request: UserLoginRequest): Promise<void> => {
			setIsLoading(true);

			await userApi
				.login(request)
				.map((user) => authentication.setUser(user))
				.map(() => navigate('/'))
				.resolve()
				.finally(() => setIsLoading(false));
		},
		[authentication, navigate],
	);

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();

		login({ email: email, password: password });
	};

	return (
		<EuiFlexGroup direction="column" style={{ gap: 24, padding: 32 }}>
			<EuiFlexItem>
				<EuiFlexGroup justifyContent="flexEnd">
					<EuiText style={{ fontSize: '1rem' }}>
						Don't have an account?
						<AppButton
							href="/signup"
							size="s"
							fill
							style={{ marginLeft: 12 }}
						>
							Sign up{/* LOC */}
						</AppButton>
					</EuiText>
				</EuiFlexGroup>
			</EuiFlexItem>

			<EuiSpacer size="l" />

			<div>
				<EuiPanel
					paddingSize="m"
					style={{ margin: '0 auto', maxWidth: 430 }}
				>
					<EuiTitle size="s">
						<h1 style={{ textAlign: 'center' }}>
							Log in{/* LOC */}
						</h1>
					</EuiTitle>

					<EuiSpacer size="s" />

					<EuiForm component="form" onSubmit={handleSubmit}>
						<EuiFormRow label="Email" /* LOC */>
							<EuiFieldText
								type="email"
								name="email"
								value={email}
								onChange={(e): void => setEmail(e.target.value)}
							/>
						</EuiFormRow>

						<EuiFormRow label="Password" /* LOC */>
							<EuiFieldPassword
								type="dual"
								value={password}
								onChange={(e): void =>
									setPassword(e.target.value)
								}
							/>
						</EuiFormRow>

						<EuiSpacer size="l" />

						<EuiButton
							type="submit"
							fullWidth
							fill
							isLoading={isLoading}
						>
							Log in{/* LOC */}
						</EuiButton>
					</EuiForm>
				</EuiPanel>
			</div>
		</EuiFlexGroup>
	);
};

export default UserLogin;
