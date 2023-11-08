import { userApi } from '@/api/UserApi';
import { UserDto } from '@/models/dto/UserDto';
import React from 'react';

interface AuthenticationContextProps {
	isLoading: boolean;
	user: UserDto | undefined;
	setUser: (user: UserDto | undefined) => void;
	isAuthenticated: boolean;
}

const AuthenticationContext = React.createContext<AuthenticationContextProps>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	undefined!,
);

interface AuthenticationProviderProps {
	children?: React.ReactNode;
}

export const AuthenticationProvider = ({
	children,
}: AuthenticationProviderProps): React.ReactElement => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [user, setUser] = React.useState<UserDto>();

	const isAuthenticated = user !== undefined;

	React.useLayoutEffect(() => {
		setIsLoading(true);

		userApi.get({}).then((result) => {
			setUser(result.ok ? result.val : undefined);

			setIsLoading(false);
		});
	}, []);

	return (
		<AuthenticationContext.Provider
			value={{
				isLoading: isLoading,
				user: user,
				setUser: setUser,
				isAuthenticated: isAuthenticated,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthentication = (): AuthenticationContextProps => {
	return React.useContext(AuthenticationContext);
};
