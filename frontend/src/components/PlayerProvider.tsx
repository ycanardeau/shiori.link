import { PlayerStore } from '@/stores/PlayerStore';
import React from 'react';

type PlayerContextProps = PlayerStore;

const PlayerContext = React.createContext<PlayerContextProps>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	undefined!,
);

interface PlayerProviderProps {
	children?: React.ReactNode;
}

export const PlayerProvider = ({
	children,
}: PlayerProviderProps): React.ReactElement => {
	const [playerStore] = React.useState(() => new PlayerStore());

	return (
		<PlayerContext.Provider value={playerStore}>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = (): PlayerContextProps => {
	return React.useContext(PlayerContext);
};
