import { BottomBar } from '@/components/BottomBar';
import { MiniPlayer } from '@/components/MiniPlayer';
import { usePlayerStore } from '@/components/PlayerStoreProvider';
import { observer } from 'mobx-react-lite';
import React from 'react';

export const Player = observer((): React.ReactElement => {
	const playerStore = usePlayerStore();

	return (
		<>
			{!playerStore.playQueueStore.isEmpty && (
				<MiniPlayer
					playerStore={playerStore}
					playQueueStore={playerStore.playQueueStore}
				/>
			)}

			<BottomBar
				playerStore={playerStore}
				playQueueStore={playerStore.playQueueStore}
			/>
		</>
	);
});
