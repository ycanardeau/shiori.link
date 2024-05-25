import { userApi } from '@/api/UserApi';
import { UserDto } from '@/models/dto/UserDto';
import {
	ReactElement,
	ReactNode,
	createContext,
	useContext,
	useLayoutEffect,
	useState,
} from 'react';

interface AuthenticationContextProps {
	isLoading: boolean;
	user: UserDto | undefined;
	setUser: (user: UserDto | undefined) => void;
	isAuthenticated: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextProps>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	undefined!,
);

interface AuthenticationProviderProps {
	children?: ReactNode;
}

export const AuthenticationProvider = ({
	children,
}: AuthenticationProviderProps): ReactElement => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserDto>();

	const isAuthenticated = user !== undefined;

	useLayoutEffect(() => {
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
			{!isLoading && children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthentication = (): AuthenticationContextProps => {
	return useContext(AuthenticationContext);
};
