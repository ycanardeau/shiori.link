import { usePlayerStore } from '@/components/PlayerStoreProvider';
import { NostalgicDiva } from '@aigamo/nostalgic-diva';
import { observer } from 'mobx-react-lite';
import React from 'react';

const bottomBarHeight = 0;

const miniPlayerSize = {
	width: 16 * 25,
	height: 9 * 25,
} as const;

export const MiniPlayer = observer((): React.ReactElement => {
	const playerStore = usePlayerStore();

	return (
		<div
			css={{
				backgroundColor: 'rgb(39, 39, 39)',
				display: 'flex',
				flexDirection: 'column',
				...(playerStore.playerBounds === undefined
					? {
							position: 'fixed',
							right: 0,
							bottom: bottomBarHeight,
							width: miniPlayerSize.width,
							height: miniPlayerSize.height,
							zIndex: 998,
					  }
					: {
							position: 'absolute',
							left: playerStore.playerBounds.x,
							top: playerStore.playerBounds.y,
							bottom: bottomBarHeight,
							width: miniPlayerSize.width,
							height: miniPlayerSize.height,
							zIndex: 998,
					  }),
			}}
		>
			<div css={{ flexGrow: 1, backgroundColor: 'black' }}>
				{playerStore.playQueueStore.currentItem && (
					<NostalgicDiva
						type={playerStore.playQueueStore.currentItem.type}
						videoId={playerStore.playQueueStore.currentItem.videoId}
					/>
				)}
			</div>
		</div>
	);
});

export const Player = observer((): React.ReactElement => {
	const playerStore = usePlayerStore();

	return <>{!playerStore.playQueueStore.isEmpty && <MiniPlayer />}</>;
});
