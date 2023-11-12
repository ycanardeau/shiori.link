import { usePlayer } from '@/components/PlayerProvider';
import { NostalgicDiva } from '@aigamo/nostalgic-diva';
import { observer } from 'mobx-react-lite';
import React from 'react';

const bottomBarHeight = 0;

const miniPlayerSize = {
	width: 16 * 25,
	height: 9 * 25,
} as const;

export const MiniPlayer = observer((): React.ReactElement => {
	const player = usePlayer();

	return (
		<div
			css={{
				backgroundColor: 'rgb(39, 39, 39)',
				display: 'flex',
				flexDirection: 'column',
				...(player.playerBounds === undefined
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
							left: player.playerBounds.x,
							top: player.playerBounds.y,
							bottom: bottomBarHeight,
							width: miniPlayerSize.width,
							height: miniPlayerSize.height,
							zIndex: 998,
					  }),
			}}
		>
			<div css={{ flexGrow: 1, backgroundColor: 'black' }}>
				{player.playQueue.currentItem && (
					<NostalgicDiva
						type={player.playQueue.currentItem.type}
						videoId={player.playQueue.currentItem.videoId}
					/>
				)}
			</div>
		</div>
	);
});

export const Player = observer((): React.ReactElement => {
	const player = usePlayer();

	return <>{!player.playQueue.isEmpty && <MiniPlayer />}</>;
});
