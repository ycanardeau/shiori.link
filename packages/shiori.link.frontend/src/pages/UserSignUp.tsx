import { userApi } from '@/api/UserApi';
import { AppButton } from '@/components/AppButton';
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
import React from 'react';

const UserSignUp = (): React.ReactElement => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();

		setIsLoading(true);

		userApi
			.signUp({
				email: email,
				password: password,
			})
			.then((signUpResult) =>
				signUpResult.map(() =>
					userApi.login({ email: email, password: password }),
				),
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<EuiFlexGroup direction="column" style={{ gap: 24, padding: 32 }}>
			<EuiFlexItem>
				<EuiFlexGroup justifyContent="flexEnd">
					<EuiText style={{ fontSize: '1rem' }}>
						Already have an account?
						<AppButton
							href="/login"
							size="s"
							fill
							style={{ marginLeft: 12 }}
						>
							Log in{/* LOC */}
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
							Sign up{/* LOC */}
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
								name="password"
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
							Sign up{/* LOC */}
						</EuiButton>
					</EuiForm>
				</EuiPanel>
			</div>
		</EuiFlexGroup>
	);
};

export default UserSignUp;
