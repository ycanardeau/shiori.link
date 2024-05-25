import { PlayerStore } from '@/stores/PlayerStore';
import React from 'react';

type PlayerStoreContextProps = PlayerStore;

const PlayerStoreContext = React.createContext<PlayerStoreContextProps>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	undefined!,
);

interface PlayerStoreProviderProps {
	children?: React.ReactNode;
}

export const PlayerStoreProvider = ({
	children,
}: PlayerStoreProviderProps): React.ReactElement => {
	const [playerStore] = React.useState(() => new PlayerStore());

	return (
		<PlayerStoreContext.Provider value={playerStore}>
			{children}
		</PlayerStoreContext.Provider>
	);
};

export const usePlayerStore = (): PlayerStoreContextProps => {
	return React.useContext(PlayerStoreContext);
};
