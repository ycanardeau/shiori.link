import { PlayerStore } from '@/stores/PlayerStore';
import {
	ReactElement,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

type PlayerStoreContextProps = PlayerStore;

const PlayerStoreContext = createContext<PlayerStoreContextProps>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	undefined!,
);

interface PlayerStoreProviderProps {
	children?: ReactNode;
}

export const PlayerStoreProvider = ({
	children,
}: PlayerStoreProviderProps): ReactElement => {
	const [playerStore] = useState(() => new PlayerStore());

	return (
		<PlayerStoreContext.Provider value={playerStore}>
			{children}
		</PlayerStoreContext.Provider>
	);
};

export const usePlayerStore = (): PlayerStoreContextProps => {
	return useContext(PlayerStoreContext);
};
